import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail } from 'class-validator';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type SaccoDocument = HydratedDocument<Sacco>;

@Schema({ timestamps: true })
export class Sacco {
  @Prop({ required: true })
  name: string;

  @IsEmail()
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  logo: string;

  @Prop({ required: false, default: [] })
  percelCategories: Array<string>;

  @Prop({ required: false })
  primaryColor: string;

  @Prop({ required: false })
  secondaryColor: string;

  @Prop({ required: false, default: 'active' })
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
    type: String,
  })
  addedBy: string;

  @Prop({ required: false })
  upadatedAt: Date;

  @Prop({
    required: false,
    type: SchemaTypes.ObjectId,
  })
  updatedBy: Types.ObjectId | string;
}

export const SaccoSchema = SchemaFactory.createForClass(Sacco);
