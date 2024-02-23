import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type LipaNaMpesaDocument = HydratedDocument<LipaNaMpesa>;

@Schema({ timestamps: true })
export class LipaNaMpesa {
  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'Station' })
  AgentStationId: Types.ObjectId;

  @Prop({ default: null, type: String })
  ReceivingAgentId: string;

  @Prop({ default: null, type: String })
  SaccoId: string;

  @Prop({ type: String, default: 'pending' })
  status: string;
}

export const LipaNaMpesaSchema = SchemaFactory.createForClass(LipaNaMpesa);
