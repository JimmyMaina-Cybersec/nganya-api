import {
    Prop,
    Schema,
    SchemaFactory
} from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export type PresenceDocument = Presence & Document;
@Schema({ timestamps: true })
export class Presence extends Document {
    @Prop({
        type: SchemaTypes.ObjectId,
        required: true,
      })
      user: Types.ObjectId | string;

    @Prop({ default: false })
    online: boolean;

    @Prop({ default: null })
    createdAt: Date;

    @Prop({ default: null })
    updatedAt: Date;
}

export const PresenceSchema = SchemaFactory.createForClass(Presence);
