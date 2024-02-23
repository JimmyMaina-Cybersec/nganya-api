import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type TicketDocument = HydratedDocument<Ticket>;

@Schema({ timestamps: true })
export class Ticket {
  @Prop({ type: String, required: true })
  bookedSeat: string;

  @Prop({ type: Number, required: true })
  pricePerSeat: number;

  @Prop({ type: String, required: true })
  from: Types.ObjectId;

  @Prop({ type: String, required: true })
  to: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Station', required: true })
  station: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Sacco', required: true })
  sacco: Types.ObjectId;

  @Prop({ type: String, required: true })
  customerPhone: string;

  @Prop({ type: String, required: true })
  customerFirstName: string;

  @Prop({ type: String, required: true })
  customersecondName: string;

  @Prop({ type: String, default: null })
  customerIdNumber: string;

  @Prop({ type: String, required: false, default: null })
  customerEmail: string;

  @Prop({ type: SchemaTypes.ObjectId, required: false, default: null })
  mpesaTrasaction: Types.ObjectId;

  @Prop({ type: String, required: true, default: 'Cash' })
  paymentMethod: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Availability',
    required: true,
  })
  availability: Types.ObjectId;

  @Prop({ type: String, required: true })
  plateNo: string;

  @Prop({ type: String, required: true })
  status: string;

  @Prop({ type: String, required: true })
  addedBy: string;

  @Prop({ type: String, required: false })
  updatedBy: string;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
