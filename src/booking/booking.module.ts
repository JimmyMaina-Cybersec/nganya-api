import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingGateway } from './booking.gateway';

@Module({
  providers: [BookingGateway, BookingService]
})
export class BookingModule {}