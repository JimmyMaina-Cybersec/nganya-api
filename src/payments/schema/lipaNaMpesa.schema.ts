import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LipaNaMpesaDocument = HydratedDocument<LipaNaMpesa>;

@Schema({ timestamps: true })
export class LipaNaMpesa {}
export const LipaNaMpesaDocument = SchemaFactory.createForClass(LipaNaMpesa);
