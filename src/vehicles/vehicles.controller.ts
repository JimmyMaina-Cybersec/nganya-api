import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtPayload } from 'src/types/jwt-payload';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Pagination } from 'src/common/decorators/paginate.decorator';
import PaginationQueryType from 'src/types/paginationQuery';

@UseGuards(JwtGuard)
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

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

  @Get('driver/:vehicleID')
  getDriverVehicles(
    @CurrentUser() user: JwtPayload,
    @Param('vehicleID') driver: string,
  ) {
    return this.vehiclesService.getDriver(user, driver);
  }

  @Patch('assign-driver')
  assignDriver(
    @CurrentUser() user: JwtPayload,
    @Body() updateVehicleDto: UpdateDriverDto,
  ) {
    return this.vehiclesService.assignDriver(user, updateVehicleDto);
  }

  @Get()
  findAll(
    @CurrentUser() user: JwtPayload,
    @Pagination() pagination: PaginationQueryType,
  ) {
    return this.vehiclesService.findAll(user, pagination);
  }

  @Post('add-to-station')
  addToStation(
    @CurrentUser() user: JwtPayload,
    @Body() vehicle: { plateNo: string },
  ) {
    return this.vehiclesService.addToStation(user, vehicle);
  }

  @Get('vehicle/:id')
  findOne(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.vehiclesService.findOne(id, user);
  }

  @Patch('upadate-vehicle/:id')
  updateVehicle(
    @Param('id') id: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.vehiclesService.updateVehicle(id, updateVehicleDto, user);
  }

  @Delete('delete-vehicle/:id')
  deleteVehicle(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.vehiclesService.deleteVehicle(id, user);
  }
}
