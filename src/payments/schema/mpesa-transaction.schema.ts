import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Payments } from './payments.schema';

export type MpesaTransactionsDocument = HydratedDocument<MpesaTransactions>;

@Schema({ timestamps: true })
export class MpesaTransactions extends Payments {
  @Prop({ required: true, type: String })
  MerchantRequestID: string;

  @Prop({ required: true, type: String })
  CheckoutRequestID: string;

  @Prop({ required: true, type: String })
  ResponseCode: string;

  @Prop({ required: true, type: String })
  ResponseDescription: string;

  @Prop({ required: true, type: String })
  CustomerMessage: string;

  @Prop({ default: null, type: Number })
  Amount: number;

  @Prop({ default: null, type: String })
  MpesaReceiptNumber: string;

  @Prop({ default: null, type: String })
  TransactionDate: string;

  @Prop({ default: null, type: String })
  PhoneNumber: string;
}
export const MpesaTransactionSchema =
  SchemaFactory.createForClass(MpesaTransactions);
