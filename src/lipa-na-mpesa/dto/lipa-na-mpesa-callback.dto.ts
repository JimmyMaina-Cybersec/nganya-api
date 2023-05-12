import { PartialType } from '@nestjs/mapped-types';
import { LipaDto } from './create-lipa-na-mpesa.dto';

export class UpdateLipaNaMpesaDto extends PartialType(LipaDto) {
  _id: string;
  // MerchantRequestID: string;
  // CheckoutRequestID: string;
  // ResultCode: number;
  // ResultDesc: string;
  // Amount: number;
  // MpesaReceiptNumber: string;
  // Balance: number;
  // TransactionDate: string;
  // PhoneNumber: string;
  transaction: any;
}
