import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type AvailabilityDocument = HydratedDocument<Availability>;

@Schema({ timestamps: true })
export class Availability {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Station' })
  station: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Route' })
  route: Types.ObjectId;

  @Prop({ type: Array, default: [], ref: 'Station' })
  stationsServiced: Array<Types.ObjectId>;

  @Prop({ default: null })
  depatureTime: Date;

  @Prop({ default: null })
  arrivalTime: Date;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Vehicle' })
  vehicle: Types.ObjectId;

  @Prop({ type: Array, default: [] })
  bookedSeats: Array<string>;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Sacco' })
  sacco: Types.ObjectId;

  @Prop({ default: 'available' })
  status: string;

  @Prop({ type: String })
  addedBy: string;

  @Prop()
  upadatedAt: Date;

  @Prop({ type: String })
  updatedBy: string;
}

export const AvailabilitySchema = SchemaFactory.createForClass(Availability);
