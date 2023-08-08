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
  SaaccoId: Types.ObjectId;
}
export const LipaNaMpesaDocument = SchemaFactory.createForClass(LipaNaMpesa);
