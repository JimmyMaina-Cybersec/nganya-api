import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type RouteDocument = HydratedDocument<Route>;

@Schema({ timestamps: true })
export class Route {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Station' })
  station: Types.ObjectId;

  @Prop({ type: Array, default: [] })
  destinations: Array<string>;

  @Prop({ type: Array, default: [] })
  farePrices: [];

  @Prop({ type: Array, default: [] })
  parcelPrices: Array<number>;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Sacco' })
  sacco: Types.ObjectId;

  @Prop({ type: String, default: 'active' })
  status: string;

  @Prop({ type: String })
  addedBy: string;

  @Prop({ type: String })
  updatedBy: string;
}

export const RouteSchema = SchemaFactory.createForClass(Route);
