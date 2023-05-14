import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateDriverDto {
  @IsNotEmpty()
  @IsString()
  driverID: string;
  @IsNotEmpty()
  @IsString()
  vehicleID: string;
}
