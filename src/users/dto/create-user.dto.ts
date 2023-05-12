import { IsString, IsNotEmpty, IsEmail, IsPhoneNumber } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  secondName: string;

  @IsString()
  @IsNotEmpty()
  idNo: string;

  @IsString()
  @IsPhoneNumber('KE')
  phone: string;

  @IsString()
  @IsNotEmpty()
  photoURL: string;

  @IsString()
  @IsNotEmpty()
  role:
    | 'Super User'
    | 'general admin'
    | 'admin'
    | 'station manager'
    | 'accountant'
    | 'station agent'
    | 'driver';

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsEmail()
  email: string;
}
