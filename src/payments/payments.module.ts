import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Payments, PaymentsSchema } from './schema/payments.schema';

@Module({
  controllers: [PaymentsController],
  imports: [
    MongooseModule.forFeature([
      { name: Payments.name, schema: PaymentsSchema },
    ]),
  ],
  providers: [PaymentsService],
})
export class PaymentsModule {}
