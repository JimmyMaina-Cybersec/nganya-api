import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type LipaNaMpesaDocument = HydratedDocument<LipaNaMpesa>;
export type MpesaTillNumberDocument = HydratedDocument<MpesaTillNumber>;
export type CashPaymentDocument = HydratedDocument<CashPayment>;

@Schema({ timestamps: true })
export class Payments {
  @Prop({ required: true, type: String })
  ServiceDescription: string;

  @Prop({ type: String, default: 'pending' })
  status: string;
}

@Schema({ timestamps: true })
export class LipaNaMpesa extends Payments {
  @Prop({ required: true, type: String })
  MerchantRequestID: string;

  @Prop({ required: true, type: String })
  CheckoutRequestID: string;

  @Prop({ required: true, type: String })
  ResultCode?: string;

  @Prop({ required: true, type: String })
  ResponseDescription: string;

  @Prop({ required: true, type: String })
  CustomerMessage: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  UserId: Types.ObjectId;

  @Prop({ required: true, type: String })
  UserFirstName: string;

  @Prop({ required: true, type: String })
  UserSecondName: string;
}

@Schema({ timestamps: true })
export class MpesaTillNumber extends Payments {
  @Prop({ required: true, type: String })
  MerchantRequestID: string;

  @Prop({ required: true, type: String })
  CheckoutRequestID: string;

  @Prop({ required: true, type: String })
  ResultCode?: string;

  @Prop({ required: true, type: String })
  ResponseDescription: string;

  @Prop({ required: true, type: String })
  CustomerMessage: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  ReceivingAgentId: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Station' })
  AgentStation: Types.ObjectId;
}

@Schema({ timestamps: true })
export class CashPayment extends Payments {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  ReceivingAgentId: Types.ObjectId;
}

export const LipaNaMpesaSchema = SchemaFactory.createForClass(LipaNaMpesa);
export const MpesaTillNumberSchema =
  SchemaFactory.createForClass(MpesaTillNumber);
export const CashPaymentschema = SchemaFactory.createForClass(CashPayment);
