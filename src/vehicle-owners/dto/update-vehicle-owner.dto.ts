import { PartialType } from '@nestjs/mapped-types';
import { CreateVehicleOwnerDto } from './create-vehicle-owner.dto';
import { IsString } from 'class-validator';

export class UpdateVehicleOwnerDto extends PartialType(
  CreateVehicleOwnerDto,
) {
  @IsString()
  _id: string;
}
