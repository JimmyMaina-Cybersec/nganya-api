import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  @IsNotEmpty()
  customerPhoneNo: string;

  @IsNumber()
  @IsNotEmpty()
  amountPaid: number;
}
