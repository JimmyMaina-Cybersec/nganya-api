import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { Percel, PercelSchema } from 'src/percel/schema/percel.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from 'src/booking/schema/booking.schema';
import {
  LipaNaMpesaTransaction,
  LipaNaMpesaTransactionSchema,
} from 'src/lipa-na-mpesa/schema/lipa-na-mpesa.schema';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService],
  imports: [
    MongooseModule.forFeature([
      { name: Percel.name, schema: PercelSchema },
      { name: Booking.name, schema: BookingSchema },
      {
        name: LipaNaMpesaTransaction.name,
        schema: LipaNaMpesaTransactionSchema,
      },
      ,
    ]),
  ],
})
export class ReportsModule {}
