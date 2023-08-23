import {IsString, IsNotEmpty} from 'class-validator';

export class AssignDriverToVehicleDto {
    @IsString()
    @IsNotEmpty()
    driverId: string;

    @IsString()
    @IsNotEmpty()
    vehicleId: string;
}


