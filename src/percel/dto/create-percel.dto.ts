import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePercelDto {
  @IsString()
  @IsNotEmpty()
  readonly senderName: string;


  @IsString()
  @IsNotEmpty()
  readonly senderPhone: string;

  @IsString()
  @IsNotEmpty()
  readonly senderIdNo: string;

  @IsString()
  @IsNotEmpty()
  readonly senderLocation: string;

  @IsString()
  @IsNotEmpty()
  readonly reciverName: string;

  @IsString()
  @IsNotEmpty()
  readonly reciverPhone: string;

  @IsString()
  @IsNotEmpty()
  readonly reciverLocation: string;

  @IsString()
  @IsNotEmpty()
  readonly parcelCategory: string;

  @IsString()
  @IsNotEmpty()
  paymentMethod: string;

  @IsString()
  agentName: string;
}
