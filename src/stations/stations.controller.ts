import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { StationsService } from './stations.service';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtPayload } from 'src/types/jwt-payload';
import { Pagination } from 'src/common/decorators/paginate.decorator';
import PaginationQueryType from 'src/types/paginationQuery';
import { PermissionsGuard } from 'src/auth/guards/permissions/permissions.guard';
import { AuthorizationGuard } from 'src/auth/guards/authorization-guard.service';
import { UserPermissions } from 'src/types/PermissionType';
import { UpdateStationsDestinationsDTO } from './dto/update-destinations.dto';

@UseGuards(AuthorizationGuard, PermissionsGuard)
@Controller('stations')
export class StationsController {
  constructor(private readonly stationsService: StationsService) { }

  @SetMetadata('permissions', [UserPermissions.CREATE_STATIONS])
  @Post('add-station')
  create(
    @Body() createStationDto: CreateStationDto,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    return this.stationsService.createStation(createStationDto, currentUser);
  }

  @SetMetadata('permissions', [UserPermissions.READ_SERVICE_AGENT_REPORTS])
  @Get()
  findAll(
    @CurrentUser() currentUser: JwtPayload,
    @Pagination() pagination: PaginationQueryType,
  ) {
    return this.stationsService.findAll(currentUser, pagination);
  }

  @SetMetadata('permissions', [UserPermissions.READ_STATIONS])
  @Get('my-station')
  myStation(@CurrentUser('station') stationID: string) {
    return this.stationsService.myStation(stationID);
  }

  @SetMetadata('permissions', [UserPermissions.READ_STATIONS])
  @Get(':id')
  findOneStation(
    @CurrentUser() currentUser: JwtPayload,
    @Param('id') id: string,
  ) {
    return this.stationsService.findOneStation(currentUser, id);
  }

  @SetMetadata('permissions', [UserPermissions.UPDATE_STATIONS])
  @Patch('update-station/:id')
  update(
    @Param('id') id: string,
    @Body() updateStationDto: UpdateStationDto,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    return this.stationsService.updateStation(
      currentUser,
      updateStationDto,
      id,
    );
  }

  @SetMetadata('permissions', [UserPermissions.CREATE_SERVICE_AGENTS])
  @Patch('my-station/update-destinations')
  updateStationsDestinations(

    @Body() updateStationsDestinationsDTO: UpdateStationsDestinationsDTO,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    return this.stationsService.updateStationsDestinations(
      currentUser,
      updateStationsDestinationsDTO,
    );
  }

  @SetMetadata('permissions', [UserPermissions.DELETE_STATIONS])
  @Delete('delete-station/:id')
  remove(@Param('id') id: string, @CurrentUser() currentUser: JwtPayload) {
    return this.stationsService.remove(id, currentUser);
  }
}
