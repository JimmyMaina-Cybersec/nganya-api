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
  CustomePhoneNo: number;

  @Prop({ default: null, type: String })
  CustomerNationalId: string;

  @Prop({ default: null, type: String })
  CustomerAddress: string;

  @Prop({ default: null, type: String })
  CustomerEmail: string;
}

export const CustomersSchema = SchemaFactory.createForClass(Customers);
