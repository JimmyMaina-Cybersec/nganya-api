import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export type PresenceDocument = Presence & Document;

@Schema({ timestamps: true })
export class Presence {
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  })
  userId: Types.ObjectId | string;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'sacco',
    required: true,
  })
  sacco: Types.ObjectId | string;

  @Prop({ default: null })
  lastActiveTime: Date;
}

export const PresenceSchema = SchemaFactory.createForClass(Presence);
