import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty()
  bookedSeat: string;

  @IsString()
  @IsNotEmpty()
  pricePerSeat: number;

  @IsString()
  @IsNotEmpty()
  from: string;

  @IsString()
  @IsNotEmpty()
  to: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  secondName: string;

  @IsString()
  @IsNotEmpty()
  idNumber: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  paymentMethod: string;

  @IsString()
  @IsNotEmpty()
  availability: string;

  @IsString()
  @IsNotEmpty()
  plateNo: string;

  @IsString()
  status:
    | "payment pending"
    | "payment confirmed"
    | "cancelled"
    | "completed"
    | "payment failed";
}
