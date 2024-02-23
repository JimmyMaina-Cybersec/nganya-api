import { IsNotEmpty, IsString } from 'class-validator';

class findUserByIdNoDTO {
  @IsNotEmpty()
  @IsString()
  idNo: string;
}
