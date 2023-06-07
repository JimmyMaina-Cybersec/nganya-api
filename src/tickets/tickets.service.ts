import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { JwtPayload } from 'src/types/jwt-payload';
import { InjectModel } from '@nestjs/mongoose';
import { Ticket, TicketDocument } from './schema/tickets.schema';
import { Model } from 'mongoose';
import { Availability, AvailabilityDocument } from 'src/schemas/Availability';

@Injectable()
export class TicketService {
  constructor(
    @InjectModel(Ticket.name)
    private readonly ticketModel: Model<TicketDocument>,
    @InjectModel(Availability.name)
    private readonly availabilityModel: Model<AvailabilityDocument>,
  ) {}

  async book(createTicketDto: CreateTicketDto, user: JwtPayload) {
    try {
      if (user.role === 'station agent' || user.role === 'station manager') {
        const ticket = await this.ticketModel.create({
          ...createTicketDto,
          station: user.station,
          sacco: user.sacco,
          addedBy: user._id,
        });
        // update booked seatst on availability
        const availability = await this.availabilityModel.findByIdAndUpdate(
          createTicketDto.availability,
          {
            $addToSet: { bookedSeats: createTicketDto.bookedSeat },
          },
        );

        return ticket;
      }
      throw new HttpException(
        'You are not allowed to book a ticket',
        HttpStatus.FORBIDDEN,
      );
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || 500,
      );
    }
  }

  async findAll(user: JwtPayload) {
    try {
      return await this.ticketModel
        .find({
          sacco: user.sacco,
        })
        .select('-__v');
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: string) {
    try {
      await this.ticketModel
        .findById(id)
        .populate('addedBy', 'firstName secondName')
        .select('-__v');
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  update(id: string, updateTicketDto: UpdateTicketDto, user: JwtPayload) {
    return `This action updates a #${id} ticket`;
  }

  remove(id: string, user: JwtPayload) {
    return `This action removes a #${id} ticket`;
  }
}
