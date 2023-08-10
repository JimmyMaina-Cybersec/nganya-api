import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type LipaNaMpesaDocument = HydratedDocument<LipaNaMpesa>;

@Schema({ timestamps: true })
export class LipaNaMpesa {
  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'Station' })
  AgentStationId: Types.ObjectId;

  @Prop({ default: null, type: SchemaTypes.ObjectId, ref: 'User' })
  ReceivingAgentId: Types.ObjectId;

  @Prop({ default: null, type: SchemaTypes.ObjectId, ref: 'User' })
  SaccoId: Types.ObjectId;

  @Prop({ type: String, default: 'pending' })
  status: string;
}

export const LipaNaMpesaSchema = SchemaFactory.createForClass(LipaNaMpesa);
