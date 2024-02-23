import { PartialType } from '@nestjs/mapped-types';
import { CreateAvailabilityDto } from './create-availability.dto';
import { IsArray } from 'class-validator';

export class UpdateAvailabilityDto extends PartialType(CreateAvailabilityDto) {
  @IsArray()
  bookedSeats: string[];
}
