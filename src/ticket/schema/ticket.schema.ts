import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type TicketDocument = HydratedDocument<Ticket>;

@Schema({ timestamps: true })
export class Ticket {
  @Prop({ type: String, required: true })
  bookedSeats: string;

  @Prop({ type: Number, required: true })
  pricePerSeat: number;

  @Prop({ type: String, required: true })
  from: Types.ObjectId;

  @Prop({ type: String, required: true })
  to: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Station', required: true })
  destinationStation: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Station', required: true })
  depatureStation: Types.ObjectId;

  @Prop({ type: String, required: false })
  phone: string;

  @Prop({ type: String, required: false })
  firstName: string;

  @Prop({ type: String, required: false })
  secondName: string;

  @Prop({ type: String, required: false })
  idNumber: string;

  @Prop({ type: String, required: false })
  email: string;

  @Prop({ type: SchemaTypes.ObjectId, required: false })
  mpesaTrasaction: Types.ObjectId;

  @Prop({ type: String, required: true })
  paymentMode: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Availability',
    immutable: true,
    required: true,
  })
  availability: Types.ObjectId;

  @Prop({ type: String, required: true })
  vehicle: string;

  @Prop({ type: String, required: true, immutable: true })
  sacco: string;

  @Prop({ type: String, required: true })
  status: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  addedBy: Types.ObjectId;

  @Prop({ type: Date, required: true })
  addedOn: Date;

  @Prop({ type: Date, required: false })
  updatedOn: Date;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: false })
  updatedBy: Types.ObjectId;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
