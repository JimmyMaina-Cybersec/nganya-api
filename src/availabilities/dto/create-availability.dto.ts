import { IsArray, IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateAvailabilityDto {
  @IsNotEmpty()
  @IsString()
  depatureLocation: string;

  @IsNotEmpty()
  @IsString()
  destinationStation: string;

  @IsArray()
  dropOffLocations: string[];

  @IsArray()
  stationsServiced: string[];

  @IsNotEmpty()
  @IsString()
  vehicleID: string;

  @IsNotEmpty()
  dropOffPrices: Map<string, number>;

  @IsNotEmpty()
  vehicleCapacity: number;

  @IsDateString()
  depatureTime?: Date;

  @IsDateString()
  arrivalTime?: Date;

  @IsNotEmpty()
  destinations: string;
}
