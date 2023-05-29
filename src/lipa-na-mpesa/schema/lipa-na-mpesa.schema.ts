import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type LipaNaMpesaTransactionDocument =
  HydratedDocument<LipaNaMpesaTransaction>;

@Schema({ timestamps: true })
export class LipaNaMpesaTransaction {
  @Prop({ type: String })
  MerchantRequestID: string;

  @Prop({ type: String })
  CheckoutRequestID: string;

  @Prop({ type: String })
  ResultCode?: string;

  @Prop({ type: String })
  ResultDesc: string;
  @Prop({ type: String })
  ResponseDescription: string;

  @Prop({ type: String })
  CustomerMessage: string;

  @Prop({ type: Number, default: null })
  Amount: number;

  @Prop({ type: String, default: null })
  MpesaReceiptNumber: string;

  @Prop({ type: Number, default: null })
  Balance: string;

  @Prop({ type: String, default: null })
  TransactionDate: string;

  @Prop({ type: String, default: null })
  PhoneNumber: number;

  @Prop({ type: String, default: null })
  firstName: string;

  @Prop({ type: String, default: null })
  secondName: string;

  @Prop({ type: String, default: null })
  idNo: string;

  @Prop({ type: String, default: null })
  phone: string;

  @Prop({ type: SchemaTypes.ObjectId })
  sacoo: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, default: null })
  station: Types.ObjectId;

  @Prop({ type: String, default: 'pending' })
  status: string;

  @Prop({ type: String, default: 'pending' })
  claimed: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  agent: string;

  @Prop({ type: Array, default: null })
  transaction: object[];
}

export const LipaNaMpesaTransactionSchema = SchemaFactory.createForClass(
  LipaNaMpesaTransaction,
);
