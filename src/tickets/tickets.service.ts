import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtPayload } from 'src/types/jwt-payload';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket, TicketDocument } from './schema/tickets.schema';

import { Availability, AvailabilityDocument } from 'src/schemas/Availability';
import PaginationQueryType from 'src/types/paginationQuery';
import { TicketQuery } from '../types/ticketQuery';

@Injectable()
export class TicketService {
  update(id: string, updateTicketDto: UpdateTicketDto, user: JwtPayload) {
    throw new Error('Method not implemented.');
  }
  remove: any;
  constructor(
    @InjectModel(Ticket.name)
    private readonly ticketModel: Model<TicketDocument>,
    @InjectModel(Availability.name)
    private readonly availabilityModel: Model<AvailabilityDocument>,
  ) {}

  async book(createTicketDto: CreateTicketDto, user: JwtPayload) {
    try {
      const ticket = await this.ticketModel.create({
        ...createTicketDto,
        station: user.user_metadata.station,
        sacco: user.user_metadata.sacco,
        addedBy: user.sub,
      });
      // update booked seatst on availability
      const availability = await this.availabilityModel.findByIdAndUpdate(
        createTicketDto.availability,
        {
          $addToSet: { bookedSeats: createTicketDto.bookedSeat },
        },
      );

      return ticket;

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

  async findAll(user: JwtPayload, pagination: PaginationQueryType) {
    try {
      const query: TicketQuery = {};

      query.station = user.user_metadata.station;

      const tickets = await this.ticketModel
        .find(query)
        .skip(pagination.skip)
        .limit(pagination.resPerPage)
        .populate('addedBy', 'firstName secondName photoURL')
        .select('-__v');

      const count = await this.ticketModel.countDocuments(query);

      return {
        data: tickets,
        page: pagination.page,
        resPerPage: pagination.resPerPage,
        numberOfPages: Math.ceil(count / pagination.resPerPage),
      };
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

  // update(id: string, updateTicketDto: UpdateTicketDto, user: user_metadata) {
  //   return `This action updates a #${id} ticket`;
  // }

  // remove(id: string, user: user_metadata) {
  //   return `This action removes a #${id} ticket`;
  // }
}
