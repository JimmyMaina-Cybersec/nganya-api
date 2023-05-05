import { Injectable } from '@nestjs/common';
import { CreateVehicleOwnerDto } from './dto/create-vehicle-owner.dto';
import { UpdateVehicleOwnerDto } from './dto/update-vehicle-owner.dto';

@Injectable()
export class VehicleOwnersService {
  create(createVehicleOwnerDto: CreateVehicleOwnerDto) {
    return 'This action adds a new vehicleOwner';
  }

  findAll() {
    return `This action returns all vehicleOwners`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vehicleOwner`;
  }

  update(id: number, updateVehicleOwnerDto: UpdateVehicleOwnerDto) {
    return `This action updates a #${id} vehicleOwner`;
  }

  remove(id: number) {
    return `This action removes a #${id} vehicleOwner`;
  }
}
