import { Prop, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CustomerDocument = HydratedDocument<Customer>;

@Schema()
export class Customer {
  @Prop({ required: true })
  firstName: string;

  @Prop()
  secondName: string;

  @Prop()
  customerID: string;

  @Prop({ required: true })
  customerPhone: string;

  @Prop({ required: true })
  seatNo: string;

  @Prop({ default: new Date() })
  addedOn: Date;

  @Prop()
  upadatedAt: Date;
}

// export const CustomerSchema = SchemaFactory.createForClass(Customer);
