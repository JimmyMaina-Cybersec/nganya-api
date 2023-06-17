import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreatePresenceDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  sacco: string;

  @IsNotEmpty()
  @IsDate()
  lastActiveTime: Date;
}
