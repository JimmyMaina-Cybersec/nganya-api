import { Module } from '@nestjs/common';
import { TicketService } from './tickets.service';
import { TicketController } from './tickets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ticket, TicketSchema } from './schema/tickets.schema';

@Module({
  controllers: [TicketController],
  imports: [
    MongooseModule.forFeature([{ name: Ticket.name, schema: TicketSchema }]),
  ],
  providers: [TicketService],
})
export class TicketModule {}
