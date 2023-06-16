import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PresenceDocument = Presence & Document;

@Schema({ timestamps: true })
export class Presence {
  @Prop({
    required: true,
  })
  userId: string;

  @Prop({ default: null })
  lastActiveTime: Date;
}

export const PresenceSchema = SchemaFactory.createForClass(Presence);
