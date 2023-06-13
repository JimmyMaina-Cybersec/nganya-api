import {
    Prop,
    Schema,
    SchemaFactory
} from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PresenceDocument = Presence & Document;
@Schema({ timestamps: true })
export class Presence extends Document {
    @Prop({ required: true })
    user: string;

    @Prop({ default: false })
    online: boolean;

    @Prop({ default: null })
    createdAt: Date;

    @Prop({ default: null })
    updatedAt: Date;
}

export const PresenceSchema = SchemaFactory.createForClass(Presence);
