import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty()
  bookedSeats: string;

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
  destinationStation: string;

  @IsString()
  @IsNotEmpty()
  depatureStation: string;

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

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  mpesaTrasaction: string;

  @IsString()
  @IsNotEmpty()
  paymentMethode: string;

  @IsString()
  @IsNotEmpty()
  availability: string;

  @IsString()
  @IsNotEmpty()
  vehicle: string;

  @IsString()
  status:
    | 'payment pending'
    | 'payment confirmed'
    | 'cancelled'
    | 'completed'
    | 'payment failed';
}
