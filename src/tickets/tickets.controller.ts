import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { TicketService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { JwtPayload } from 'src/types/jwt-payload';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@UseGuards(JwtGuard)
@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) { }

  @Post('book-ticket')
  create(
    @Body() createTicketDto: CreateTicketDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.ticketService.book(createTicketDto, user);
  }

  @Get()
  findAll(user: JwtPayload, @Query() query: Object) {
    return this.ticketService.findAll(user, query);
  }

  @Get('ticket/:id')
  findOne(@Param('id') id: string) {
    return this.ticketService.findOne(id);
  }

  @Patch('update-ticket/:id')
  update(
    @Param('id') id: string,
    @Body() updateTicketDto: UpdateTicketDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.ticketService.update(id, updateTicketDto, user);
  }

  @Delete('delete-ticket/:id')
  remove(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.ticketService.remove(id, user);
  }
}
