import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail } from 'class-validator';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type StationDocument = HydratedDocument<Station>;

@Schema({ timestamps: true })
export class Station {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  street: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  phone: string;

  @IsEmail()
  @Prop({ required: false })
  email: string;

  @Prop({ required: false })
  photoURL: string;

  @Prop({ required: false, default: [] })
  destinations: Array<string>;

  // categories
  @Prop({ required: false, default: [] })
  parcelCategories: Array<string>;

  @Prop({
    required: true,
    type: SchemaTypes.ObjectId,
  })
  sacco: Types.ObjectId;

  @Prop({ required: true, default: 'active' })
  status: string;

  @Prop({
    required: false,
    default: () => Date.now(),
    immutable: true,
  })
  addedOn: Date;

  @Prop({
    required: false,
    immutable: true,
    type: SchemaTypes.ObjectId,
  })
  addedBy: Types.ObjectId;

  @Prop({ required: false })
  upadatedAt: Date;

  @Prop({
    required: false,
    type: SchemaTypes.ObjectId,
  })
  updatedBy: Types.ObjectId | string;
}

export const StationSchema = SchemaFactory.createForClass(Station);
