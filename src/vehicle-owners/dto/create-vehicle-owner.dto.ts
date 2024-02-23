import {
  IsNotEmpty,
  IsNumberString,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateVehicleOwnerDto {
  @IsNumberString()
  @IsNotEmpty()
  idNo: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  secondName: string;

  @IsString()
  address?: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  photoURL: string;
}
