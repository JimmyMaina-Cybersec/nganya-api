import { IsEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LipaDto {
  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  secondName: string;

  @IsString()
  @IsNotEmpty()
  idNo: string;
  //   @IsString()
  //   description: string;
}
