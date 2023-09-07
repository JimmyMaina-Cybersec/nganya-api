import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail } from 'class-validator';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type StationDocument = HydratedDocument<Station>;

@Schema({ timestamps: true })
export class Station {
  @Prop({ required: false, default: null })
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


  @Prop({
    required: true,
    type: SchemaTypes.ObjectId,
  })
  sacco: Types.ObjectId;

  @Prop({ required: true, default: 'active' })
  status: string;

  @Prop({
    required: true,
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

export const StationSchema = SchemaFactory.createForClass(Station);
