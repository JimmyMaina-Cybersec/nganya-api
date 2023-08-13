import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type PaymentsDocument = HydratedDocument<Payments>;

@Schema({ timestamps: true })
export class Payments {
  @Prop({ type: String, default: null })
  TransactionType: string;

  @Prop({ default: null, type: SchemaTypes.ObjectId, ref: 'PushSTK' })
  PushSTKId: Types.ObjectId;

  @Prop({ default: null, type: SchemaTypes.ObjectId, ref: 'LipaNaMpesa' })
  LipaNaMpesaId: Types.ObjectId;

  @Prop({ default: null, type: SchemaTypes.ObjectId, ref: 'CashPayments' })
  CashPaymentsId: Types.ObjectId;

  @Prop({ type: Number, required: true })
  AmountPaid: number;

  @Prop({ default: null, type: SchemaTypes.ObjectId, ref: 'Ticket' })
  TicketId: Types.ObjectId;

  @Prop({ default: null, type: SchemaTypes.ObjectId, ref: 'Customers' })
  CustomerId: Types.ObjectId;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'Station' })
  AgentStationId: Types.ObjectId;

  @Prop({ default: null, type: String })
  ReceivingAgentId: string;

  @Prop({ default: null, type: String })
  SaccoId: string;

  @Prop({ required: true, type: String })
  ServiceDescription: string;

  @Prop({ type: String, default: 'pending' })
  status: string;
}

export const PaymentsSchema = SchemaFactory.createForClass(Payments);
