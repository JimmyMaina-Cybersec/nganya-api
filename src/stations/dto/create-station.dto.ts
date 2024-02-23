import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateStationDto {
  @IsString()
  name: string;

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsArray()
  destinations: string[];


}
