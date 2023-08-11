import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TicketService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { OldJwtPayload } from 'src/types/jwt-payload';
import { AuthGuard } from '@nestjs/passport';
import { OldCurrentUser } from 'src/common/decorators/current-user.decorator';
import PaginationQueryType from '../types/paginationQuery';
import { Pagination } from '../common/decorators/paginate.decorator';

@UseGuards(AuthGuard('jwt'))
@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) { }

  @Post('book-ticket')
  create(
    @Body() createTicketDto: CreateTicketDto,
    @OldCurrentUser() user: OldJwtPayload,
  ) {
    return this.ticketService.book(createTicketDto, user);
  }

  @Get()
  findAll(
    @OldCurrentUser() user: OldJwtPayload,
    @Pagination() pagination: PaginationQueryType,
  ) {
    return this.ticketService.findAll(user, pagination);
  }

  @Get('ticket/:id')
  findOne(@Param('id') id: string) {
    return this.ticketService.findOne(id);
  }

  @Patch('update-ticket/:id')
  update(
    @Param('id') id: string,
    @Body() updateTicketDto: UpdateTicketDto,
    @OldCurrentUser() user: OldJwtPayload,
  ) {
    return this.ticketService.update(id, updateTicketDto, user);
  }

  @Delete('delete-ticket/:id')
  remove(@Param('id') id: string, @OldCurrentUser() user: OldJwtPayload) {
    return this.ticketService.remove(id, user);
  }
}
