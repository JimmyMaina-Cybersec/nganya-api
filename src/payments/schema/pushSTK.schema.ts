import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type PushSTKDocument = HydratedDocument<PushSTK>;

@Schema({ timestamps: true })
export class PushSTK {
  @Prop({ required: true, type: String })
  CheckoutRequestID: string;

  @Prop({ required: true, type: String })
  MerchantRequestID: string;

  @Prop({ required: true, type: String })
  ResponseCode: string;

  @Prop({ required: true, type: String })
  ResponseDescription: string;

  @Prop({ required: true, type: String })
  CustomerMessage: string;

  @Prop({ default: null, type: Number })
  Amount: number;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'Station' })
  AgentStationId: Types.ObjectId;

  @Prop({ default: null, type: SchemaTypes.ObjectId, ref: 'User' })
  ReceivingAgentId: Types.ObjectId;

  @Prop({ default: null, type: SchemaTypes.ObjectId, ref: 'User' })
  SaccoId: Types.ObjectId;

  @Prop({ default: null, type: String })
  MpesaReceiptNumber: string;

  @Prop({ default: null, type: String })
  TransactionDate: string;

  @Prop({ default: null, type: String })
  PhoneNumber: string;
}
export const PushSTKSchema = SchemaFactory.createForClass(PushSTK);
