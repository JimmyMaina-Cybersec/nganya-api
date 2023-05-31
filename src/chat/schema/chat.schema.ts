import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Document } from 'mongoose';

export type ChatDocument = HydratedDocument<Chat>;

@Schema({ timestamps: true })
export class Chat {
  @Prop({ type: String })
  message: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  from: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  to: Types.ObjectId;

  @Prop({ type: String, default: 'pending' })
  status: string;

  @Prop({ type: String, default: 'unread' })
  read: string;

  @Prop({ type: String, default: null })
  file: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Sacco' })
  sacco: Types.ObjectId;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
