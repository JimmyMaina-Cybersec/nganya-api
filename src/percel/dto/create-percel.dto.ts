import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePercelDto {
  @IsString()
  @IsNotEmpty()
  readonly senderFirstName: string;

  @IsString()
  @IsNotEmpty()
  readonly senderSecondName: string;

  @IsString()
  @IsNotEmpty()
  readonly senderPhone: string;

  @IsString()
  @IsNotEmpty()
  readonly senderLocation: string;

  @IsString()
  @IsNotEmpty()
  readonly reciverFirstName: string;

  @IsString()
  @IsNotEmpty()
  readonly reciverSecondName: string;

  @IsString()
  @IsNotEmpty()
  readonly reciverPhone: string;

  @IsString()
  @IsNotEmpty()
  readonly reciverLocation: string;

  @IsString()
  @IsNotEmpty()
  readonly percelType: string;

  @IsString()
  readonly percelWeight: string;

  @IsString()
  @IsNotEmpty()
  paymentMethode: string;
}