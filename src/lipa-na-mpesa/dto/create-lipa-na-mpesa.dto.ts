import { IsEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LipaDto {
  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsString()
  @IsEmpty()
  firstName: string;

  @IsString()
  @IsEmpty()
  secondName: string;

  @IsString()
  @IsEmpty()
  idNo: string;
  //   @IsString()
  //   description: string;
}
