import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VehicleOwnersService } from './vehicle-owners.service';
import { CreateVehicleOwnerDto } from './dto/create-vehicle-owner.dto';
import { UpdateVehicleOwnerDto } from './dto/update-vehicle-owner.dto';

@Controller('vehicle-owners')
export class VehicleOwnersController {
  constructor(private readonly vehicleOwnersService: VehicleOwnersService) {}

  @Post()
  create(@Body() createVehicleOwnerDto: CreateVehicleOwnerDto) {
    return this.vehicleOwnersService.create(createVehicleOwnerDto);
  }

  @Get()
  findAll() {
    return this.vehicleOwnersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehicleOwnersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVehicleOwnerDto: UpdateVehicleOwnerDto) {
    return this.vehicleOwnersService.update(+id, updateVehicleOwnerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehicleOwnersService.remove(+id);
  }
}
