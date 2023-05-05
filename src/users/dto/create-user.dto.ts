import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsPhoneNumber,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly secondName: string;

  @IsString()
  @IsNotEmpty()
  readonly idNo: string;

  @IsString()
  @IsPhoneNumber('KE')
  readonly phone: string;

  @IsString()
  @IsNotEmpty()
  readonly photoURL: string;

  @IsString()
  @IsNotEmpty()
  readonly role: string;

  @IsString()
  @IsNotEmpty()
  readonly status: string;

  @IsString()
  readonly level: number;

  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  readonly sacco: string;

  @IsString()
  readonly station: string;

  @IsString()
  readonly vehicle: string;

  @IsString()
  readonly roles: Record<string, boolean>;

  @IsString()
  readonly createdAt: Date;

  @IsString()
  readonly updatedAt: Date;

  @IsString()
  addedBy: string;
}
