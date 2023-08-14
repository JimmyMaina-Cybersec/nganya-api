import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { PercelService } from './percel.service';
import { CreatePercelDto } from './dto/create-percel.dto';
import { UpdatePercelDto } from './dto/update-percel.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtPayload, OldJwtPayload } from 'src/types/jwt-payload';

import { Pagination } from '../common/decorators/paginate.decorator';
import PaginationQueryType from 'src/types/paginationQuery';
import { PermissionsGuard } from 'src/auth/guards/permissions/permissions.guard';
import { AuthorizationGuard } from 'src/auth/guards/authorization-guard.service';
import { UserPermissions } from 'src/types/PermissionType';

@UseGuards(AuthorizationGuard, PermissionsGuard)
@Controller('percels')
export class PercelController {
  constructor(private readonly percelService: PercelService) { }

  @SetMetadata('permissions', [UserPermissions.BOOK_PARCEL])
  @Post('send')
  sendPercel(
    @Body() createPercelDto: CreatePercelDto,
    @CurrentUser() agent: JwtPayload,
  ) {
    return this.percelService.sendPercel(createPercelDto, agent);
  }
// agent - all percels in station
  @SetMetadata('permissions', [UserPermissions.READ_SERVICE_AGENT_REPORTS])
  @Get('get-agent-parcels')
  getAgentPercels(
    @CurrentUser() agent: JwtPayload,
    @Pagination() pagination: PaginationQueryType,
  ) {
    return this.percelService.getAgentPercels(agent, pagination);
  }

  // station manager- all percels in station
  @SetMetadata('permissions', [UserPermissions.READ_SERVICE_AGENTS_REPORTS])
  @Get('get-parcels-in-station')
  getStationPercels(
    @CurrentUser() stationManager: JwtPayload,
    @Pagination() pagination: PaginationQueryType,
  ) {
    return this.percelService.getStationPercels(stationManager, pagination);
  }

// admin - all percels in all stations
  @SetMetadata('permissions', [UserPermissions.READ_STATIONS_REPORTS])
  @Get('get-parcels/:stationId')
  getAllParcels(
    @CurrentUser() user: JwtPayload,
    @Param('stationId') stationId: string,
    @Pagination() pagination: PaginationQueryType,
  ) {
    return this.percelService.getAllParcels(user, stationId, pagination);
  }

  @SetMetadata('permissions', [UserPermissions.READ_PARCELS])
  @Get()
  findAll(
    @CurrentUser() user: JwtPayload,
    @Pagination() pagination: PaginationQueryType,
  ) {
    return this.percelService.findAll(user, pagination);
  }

  @SetMetadata('permissions', [UserPermissions.UPDATE_PARCELS])
  @Patch('upadate/:id')
  update(
    @Param('id') id: string,
    @Body() updatePercelDto: UpdatePercelDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.percelService.update(user, id, updatePercelDto);
  }
}


