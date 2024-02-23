import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type CashPaymentsDocument = HydratedDocument<CashPayments>;

@Schema({ timestamps: true })
export class CashPayments {
  @Prop({ default: null, type: String })
  ReceivingAgentId: string;

  @Prop({ type: String, default: 'pending' })
  status: string;

  @Prop({ required: true, type: String })
  ServiceDescription: string;
}

export const CashPaymentsDocument = SchemaFactory.createForClass(CashPayments);
