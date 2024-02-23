import { Module } from '@nestjs/common';
import { TicketService } from './tickets.service';
import { TicketController } from './tickets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ticket, TicketSchema } from './schema/tickets.schema';
import { AvailabilitySchema } from 'src/availabilities/schema/availability.schema';
import { Availability } from 'src/schemas/Availability';

@Module({
  controllers: [TicketController],
  imports: [
    MongooseModule.forFeature([
      { name: Ticket.name, schema: TicketSchema },
      { name: Availability.name, schema: AvailabilitySchema },
    ]),
  ],
  providers: [TicketService],
})
export class TicketModule {}
