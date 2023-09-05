import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type PercelDocument = HydratedDocument<Parcel>;

@Schema({ timestamps: true })
export class Parcel {
  @Prop({ type: String, required: true })
  senderFirstName: string;

  @Prop({ type: String, required: true })
  senderSecondName: string;

  @Prop({ type: String, required: true })
  senderPhone: string;

  @Prop({ type: String, required: true })
  senderLocation: string;

  @Prop({ type: String, required: true })
  senderIdNo: string;

  @Prop({ type: String, required: true })
  reciverFirstName: string;

  @Prop({ type: String, required: true })
  reciverSecondName: string;

  @Prop({ type: String, required: true })
  reciverPhone: string;

  @Prop({ type: String, required: true })
  reciverLocation: string;

  @Prop({ type: String, required: true })
  sendingAgentName: string;

  @Prop({ type: String, default: null })
  reciverIdNo: string;

  @Prop({ type: String, default: 0 })
  parcelWeight: string;

  @Prop({ type: String, required: true })
  parcelCategory: string;

  @Prop({ type: String, required: true })
  paymentMethod: string;

  @Prop({ type: String, default: 'pending' })
  status: string;

  @Prop({ type: String, required: true })
  sendingAgent: string;

  @Prop({ type: String })
  receivingAgent: string;

  @Prop({ type: String })
  driver: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Availability' })
  availability: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Sacco' })
  sacco: Types.ObjectId;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Station',
    required: true,
  })
  sendingStation: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Station' })
  recivingStation: Types.ObjectId;

  @Prop({ type: Date })
  pickedUpAt: Date;

  @Prop({ type: String })
  pickupAgent: string;

  @Prop({ type: String })
  updatedBy: string;
}

export const ParcelSchema = SchemaFactory.createForClass(Parcel);
