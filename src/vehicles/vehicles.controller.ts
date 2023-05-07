import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtPayload } from 'src/types/jwt-payload';

@UseGuards(JwtGuard)
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post('add-vehicle/:vehicleOwnerID')
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

  @Get()
  findAll(@CurrentUser() user: JwtPayload) {
    return this.vehiclesService.findAll(user);
  }

  @Get(':id')
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
