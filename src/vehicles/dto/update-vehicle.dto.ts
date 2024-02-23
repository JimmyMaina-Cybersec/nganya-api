import { PartialType } from '@nestjs/mapped-types';
import { CreateVehicleDto } from './create-vehicle.dto';
import { Types } from 'mongoose';
import { IsString } from 'class-validator';

export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {
  @IsString()
  _id?: string;

  @IsString()
  driver?: string | Types.ObjectId;

  @IsString()
  lastAvailability?: string;

  @IsString()
  lastStation?: string;
  destinationStation?: string;

  @IsString()
  inQueue?: boolean;
}
