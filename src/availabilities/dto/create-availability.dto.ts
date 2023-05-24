import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateAvailabilityDto {
  @IsNotEmpty()
  @IsString()
  destinationStation: string;

  @IsArray()
  dropOffLocations: string[];

  @IsArray()
  stationsServiced: string[];

  @IsNotEmpty()
  dropOffPrices: Map<string, number>;

  @IsString()
  vehicle: string;

  @IsDateString()
  depatureTime?: Date;

  @IsDateString()
  arrivalTime?: Date;

  @IsNotEmpty()
  destinations: string;
}
