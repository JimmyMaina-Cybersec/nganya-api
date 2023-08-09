import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsString()
  @IsNotEmpty()
  customerFirstName: string;

  @IsString()
  @IsNotEmpty()
  customerLastName: string;

  @IsString()
  @IsNotEmpty()
  customerPhoneNo: string;

  @IsNumber()
  @IsNotEmpty()
  amountPaid: number;

  @IsString()
  @IsNotEmpty()
  customerNationalId?: string;

  @IsString()
  @IsNotEmpty()
  customerAddress?: string;

  @IsString()
  @IsNotEmpty()
  customerEmail?: string;
}
