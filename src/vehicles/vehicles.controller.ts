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
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtPayload, OldJwtPayload } from 'src/types/jwt-payload';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Pagination } from 'src/common/decorators/paginate.decorator';
import PaginationQueryType from 'src/types/paginationQuery';
import { UserPermissions } from 'src/types/PermissionType';
import { AuthorizationGuard } from 'src/auth/guards/authorization-guard.service';
import { PermissionsGuard } from 'src/auth/guards/permissions/permissions.guard';

@UseGuards(AuthorizationGuard, PermissionsGuard)
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @SetMetadata('permissions', [UserPermissions.CREATE_VEHICLE])
  @Post('add-vehicle')
  addVehicle(
    @Body() createVehicleDto: CreateVehicleDto,
    @CurrentUser() user: JwtPayload,
    @Param('vehicleOwnerID') vehicleOwner: string,
  ) {
    return this.vehiclesService.addVehicle(
      createVehicleDto,
      user,
      vehicleOwner,
    );
  }

  @SetMetadata('permissions', [UserPermissions.READ_VEHICLES])
  @Get('vehicle-owner/:vehicleOwnerID')
  getOwnerVehicles(
    @CurrentUser() user: JwtPayload,
    @Param('vehicleOwnerID') vehicleOwner: string,
    @Pagination() pagination: PaginationQueryType,
  ) {
    return this.vehiclesService.getOwnerVehicles(
      user,
      vehicleOwner,
      pagination,
    );
  }

  @SetMetadata('permissions', [UserPermissions.READ_VEHiCLE_OWNER])
  @Get('driver/:vehicleID')
  getDriverVehicles(
    @CurrentUser() user: JwtPayload,
    @Param('vehicleID') driver: string,
  ) {
    return this.vehiclesService.getDriver(user, driver);
  }

  @SetMetadata('permissions', [UserPermissions.UPDATE_VEHiCLE_OWNER])
  @Patch('assign-driver')
  assignDriver(
    @CurrentUser() user: JwtPayload,
    @Body() updateVehicleDto: UpdateDriverDto,
  ) {
    return this.vehiclesService.assignDriver(user, updateVehicleDto);
  }

  @SetMetadata('permissions', [UserPermissions.READ_VEHICLES])
  @Get()
  findAll(
    @CurrentUser() user: JwtPayload,
    @Pagination() pagination: PaginationQueryType,
  ) {
    return this.vehiclesService.findAll(user, pagination);
  }

  @SetMetadata('permissions', [UserPermissions.UPDATE_VEHICLE])
  @Post('add-to-station')
  addToStation(
    @CurrentUser() user: JwtPayload,
    @Body() vehicle: { plateNo: string },
  ) {
    return this.vehiclesService.addToStation(user, vehicle);
  }

  @SetMetadata('permissions', [UserPermissions.READ_VEHICLES])
  @Get('vehicle/:id')
  findOne(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.vehiclesService.findOne(id, user);
  }

  @SetMetadata('permissions', [UserPermissions.UPDATE_VEHICLE])
  @Patch('upadate-vehicle/:id')
  updateVehicle(
    @Param('id') id: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.vehiclesService.updateVehicle(id, updateVehicleDto, user);
  }

  @SetMetadata('permissions', [UserPermissions.DELETE_VEHICLE])
  @Delete('delete-vehicle/:id')
  deleteVehicle(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.vehiclesService.deleteVehicle(id, user);
  }
}
