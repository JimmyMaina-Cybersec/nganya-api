import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type VehicleOwnerDocument = HydratedDocument<VehicleOwner>;

@Schema({ timestamps: true })
export class VehicleOwner {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  secondName: string;

  @Prop({ required: true })
  idNo: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: false })
  email: string;

  @Prop({ required: true })
  photoURL: string;

  @Prop({
    required: false,
    default: () => Date.now(),
    immutable: true,
  })
  addedOn: Date;

  @Prop({ required: true, type: SchemaTypes.ObjectId })
  sacco: Types.ObjectId;

  @Prop({ required: true })
  status: string;

  @Prop({
    required: false,
    immutable: true,
    type: String,
  })
  addedBy: String;

  @Prop({ required: false })
  upadatedAt: Date;

  @Prop({
    required: false,
    type: String,
  })
  updatedBy: String;
}

export const VehicleOwnerSchema = SchemaFactory.createForClass(VehicleOwner);
