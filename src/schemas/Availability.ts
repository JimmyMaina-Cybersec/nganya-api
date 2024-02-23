import { Prop, Schema } from '@nestjs/mongoose';
import { ObjectId } from 'bson';
import { HydratedDocument } from 'mongoose';

export type AvailabilityDocument = HydratedDocument<Availability>;

@Schema()
export class Availability {
  @Prop({ type: ObjectId, ref: 'Station' })
  depatureStation: string;

  @Prop({ type: ObjectId })
  finalDestinationStation: string;

  @Prop({ type: Array })
  dropOffLocations: Array<string>;

  @Prop()
  dropOffPrices: Array<Object>;

  @Prop()
  depatureTime: Date;

  @Prop()
  arrivalTime: Date;

  @Prop({ type: ObjectId, ref: 'Vehicle' })
  vehicle: string;

  @Prop({ type: Array })
  bookedSeates: Array<string>;

  @Prop({ type: ObjectId, ref: 'Sacco' })
  sacco: string;

  @Prop()
  status: string;

  @Prop()
  addedOn: Date;

  @Prop({ type: String })
  addedBy: string;

  @Prop()
  upadatedAt: Date;

  @Prop({ type: String })
  updatedBy: string;
}
