import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Payments, PaymentsSchema } from './schema/payments.schema';
import { LipaNaMpesa, LipaNaMpesaSchema } from './schema/lipaNaMpesa.schema';
import { PushSTK, PushSTKSchema } from './schema/pushSTK.schema';
import { Customers, CustomersSchema } from './schema/customer.schema';

@Module({
  controllers: [PaymentsController],
  imports: [
    MongooseModule.forFeature([
      { name: Payments.name, schema: PaymentsSchema },
      { name: LipaNaMpesa.name, schema: LipaNaMpesaSchema },
      { name: PushSTK.name, schema: PushSTKSchema },
      { name: Customers.name, schema: CustomersSchema },
    ]),
  ],
  providers: [PaymentsService],
})
export class PaymentsModule {}
