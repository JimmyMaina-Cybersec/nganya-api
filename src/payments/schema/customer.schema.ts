import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CustomerDocument = HydratedDocument<Customers>;

@Schema({ timestamps: true })
export class Customers {
  @Prop({ required: true, type: String })
  customerFirstName: string;

  @Prop({ required: true, type: String })
  customerLastName: string;

  @Prop({ required: true, type: Number })
  customerPhoneNo: number;

  @Prop({ default: null, type: String })
  customerNationalId: string;

  @Prop({ default: null, type: String })
  customerAddress: string;

  @Prop({ default: null, type: String })
  customerEmail: string;
}

export const CustomersSchema = SchemaFactory.createForClass(Customers);
