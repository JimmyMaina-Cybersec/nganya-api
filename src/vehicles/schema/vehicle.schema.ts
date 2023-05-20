import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type VehicleDocument = HydratedDocument<Vehicle>;

@Schema({ timestamps: true })
export class Vehicle {
  @Prop({ required: true })
  plateNo: string;

  @Prop({ required: true })
  make: string;

  @Prop({ required: true })
  model: string;

  @Prop({ required: true })
  year: number;

  @Prop({ required: true })
  color: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: false })
  imageURL: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: false })
  driver: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'VehicleOwner', required: true })
  owner: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Sacco', required: true })
  sacco: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  addedBy: Types.ObjectId;

  @Prop({ default: () => Date.now() })
  addedOn: Date;

  @Prop({ default: () => Date.now() })
  upadatedAt: Date;

  @Prop({ default: 'active' })
  status: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Station', required: false })
  lastStation: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Station', required: false })
  currentStation: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Station', required: false })
  nextStation: Types.ObjectId;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
