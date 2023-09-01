import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { RoutesService } from './routes.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import {
  CurrentUser,
  OldCurrentUser,
} from 'src/common/decorators/current-user.decorator';
import { JwtPayload, OldJwtPayload } from 'src/types/jwt-payload';
import { DeleteResult } from 'mongodb';
import { AuthorizationGuard } from '../auth/guards/authorization-guard.service';
import { PermissionsGuard } from '../auth/guards/permissions/permissions.guard';
import { UserPermissions } from '../types/PermissionType';
import CreatePriceDto from './dto/create-price.dto';

@UseGuards(AuthorizationGuard, PermissionsGuard)
@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) { }

  @SetMetadata('permissions', [UserPermissions.CREATE_ROUTES])
  @Post('add-route')
  create(
    @Body() createRouteDto: CreateRouteDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.routesService.create(createRouteDto, user);
  }

  @Get()
  findAll(@Query() query: any, @CurrentUser() user: JwtPayload) {
    return this.routesService.findAll(query, user);
  }

  @Get('station-routes')
  findStationRoutes(@CurrentUser() user: JwtPayload) {
    return this.routesService.findStationRoutes(user);
  }


  @Get('station-route/:id')
  findOne(@Param('id') id: string, user: JwtPayload) {
    return this.routesService.findOne(id);
  }

  @Patch('update-price/:id')
  updateRoutePrice(
    @Param('id') id: string,
    @Body() createPriceDto: CreatePriceDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.routesService.updatePrice(id, createPriceDto, user);
  }

  @Delete('delete-route/:id')
  remove(
    @Param('id') id: string,
    @CurrentUser() user: JwtPayload,
  ): Promise<DeleteResult> {
    return this.routesService.remove(id, user);
  }
}
