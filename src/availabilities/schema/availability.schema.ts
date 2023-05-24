import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type AvailabilityDocument = HydratedDocument<Availability>;

@Schema({ timestamps: true })
export class Availability {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Station' })
  depatureStation: string;

  @Prop({ type: SchemaTypes.ObjectId })
  destinationStation: Types.ObjectId;

  @Prop({ type: Array })
  dropOffLocations: Array<string>;

  @Prop({ type: Array, default: [], ref: 'Station' })
  stationsServiced: Array<Types.ObjectId>;

  @Prop()
  dropOffPrices: Map<string, number>;

  @Prop()
  depatureTime: Date;

  @Prop()
  arrivalTime: Date;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Vehicle' })
  vehicle: Types.ObjectId;

  @Prop({ type: Array, default: [] })
  bookedSeates: Array<string>;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Sacco' })
  sacco: Types.ObjectId;

  @Prop()
  status: string;

  @Prop()
  addedOn: Date;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  addedBy: Types.ObjectId;

  @Prop()
  upadatedAt: Date;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  updatedBy: Types.ObjectId;
}

export const AvailabilitySchema =
  SchemaFactory.createForClass(Availability);
