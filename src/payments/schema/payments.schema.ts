import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type PaymentsDocument = HydratedDocument<Payments>;

@Schema({ timestamps: true })
export class Payments {
  @Prop({ type: String, required: true })
  TransactionMethod: string;

  @Prop({ type: String, default: null })
  TransactionType: string;

  @Prop({ type: Number, required: true })
  AmountPaid: number;

  @Prop({ default: null, type: String })
  MpesaTransaction: string;

  @Prop({ default: null, type: SchemaTypes.ObjectId, ref: 'Ticket' })
  TicketId: Types.ObjectId;

  @Prop({ default: null, type: SchemaTypes.ObjectId, ref: 'Customers' })
  CustomerId: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  ReceivingAgentId: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Station' })
  AgentStation: Types.ObjectId;

  @Prop({ required: true, type: String })
  ServiceDescription: string;

  @Prop({ type: String, default: 'pending' })
  status: string;
}

export const PaymentsSchema = SchemaFactory.createForClass(Payments);
