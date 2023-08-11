import { IsString, IsNotEmpty, IsEmail, IsPhoneNumber } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  idNo: string;

  @IsString()
  @IsPhoneNumber('KE')
  phone: string;


  @IsEmail()
  email: string;
}
