import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type PercelDocument = HydratedDocument<Percel>;

@Schema({ timestamps: true })
export class Percel {
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

  @Prop({ type: String, required: true })
  percelType: string;

  @Prop({ type: String, default: 0 })
  percelWeight: string;

  @Prop({ type: String, required: true })
  percelCategory: string;

  @Prop({ type: String, required: true })
  paymentMethode: string;

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

export const PercelSchema = SchemaFactory.createForClass(Percel);
