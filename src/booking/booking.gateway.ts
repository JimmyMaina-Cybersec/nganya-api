import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@WebSocketGateway()
export class BookingGateway {
  constructor(private readonly bookingService: BookingService) {}

  @SubscribeMessage('createBooking')
  create(@MessageBody() createBookingDto: CreateBookingDto) {
    return this.bookingService.create(createBookingDto);
  }

  @SubscribeMessage('findAllBooking')
  findAll() {
    return this.bookingService.findAll();
  }

  @SubscribeMessage('findOneBooking')
  findOne(@MessageBody() id: number) {
    return this.bookingService.findOne(id);
  }

  @SubscribeMessage('updateBooking')
  update(@MessageBody() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.update(updateBookingDto.id, updateBookingDto);
  }

  @SubscribeMessage('removeBooking')
  remove(@MessageBody() id: number) {
    return this.bookingService.remove(id);
  }
}
