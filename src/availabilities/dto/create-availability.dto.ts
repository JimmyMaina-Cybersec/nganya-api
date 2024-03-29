import { IsArray, IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateAvailabilityDto {
  @IsString()
  @IsNotEmpty()
  route: string[];

  @IsArray()
  stationsServiced: string[];

  @IsString()
  vehicle: string;

  @IsString()
  @IsNotEmpty()
  plateNo: string;

  @IsDateString()
  depatureTime: Date;

  @IsDateString()
  arrivalTime: Date;
}
