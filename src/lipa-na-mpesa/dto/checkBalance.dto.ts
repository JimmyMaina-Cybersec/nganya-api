import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CheckBalanceDTO {
  @IsNotEmpty()
  @IsIn(['Till', 'Paybill'])
  organisationType: 'Till' | 'Paybill';

  @IsNotEmpty()
  @IsString()
  phoneOrAccountNumber: string;

  @IsNotEmpty()
  @IsString()
  shortCode: string;
}
