import { PartialType } from '@nestjs/mapped-types';
import { LipaDto } from './create-lipa-na-mpesa.dto';

export class LipaNaMpesaCallbackDto extends PartialType(LipaDto) {
  transaction: any;
}
