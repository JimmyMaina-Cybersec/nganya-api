import { IsNotEmpty, IsString } from 'class-validator';

export class CreateChatDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  file: string;

  @IsString()
  @IsNotEmpty()
  to: string;
}
