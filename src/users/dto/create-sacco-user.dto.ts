import { CreateUserDto } from './create-user.dto';
import { IsString } from 'class-validator';

export class CreateSaccoUserDto extends CreateUserDto {
  @IsString()
  station?: string;

  @IsString()
  vehicle?: string;
}
