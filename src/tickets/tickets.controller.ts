import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { TicketService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { JwtPayload } from 'src/types/jwt-payload';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import PaginationQueryType from '../types/paginationQuery';
import { Pagination } from '../common/decorators/paginate.decorator';
import { AuthorizationGuard } from 'src/auth/guards/authorization-guard.service';
import { PermissionsGuard } from 'src/auth/guards/permissions/permissions.guard';
import { UserPermissions } from 'src/types/PermissionType';

@UseGuards(AuthorizationGuard, PermissionsGuard)
@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @SetMetadata('permissions', [UserPermissions.BOOK_TICKET])
  @Post('book-ticket')
  create(
    @Body() createTicketDto: CreateTicketDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.ticketService.book(createTicketDto, user);
  }

  @SetMetadata('permissions', [UserPermissions.READ_SERVICE_AGENT_REPORTS])
  @Get()
  findAll(
    @CurrentUser() user: JwtPayload,
    @Pagination() pagination: PaginationQueryType,
  ) {
    return this.ticketService.findAll(user, pagination);
  }

  @SetMetadata('permissions', [UserPermissions.READ_TICKETS])
  @Get('ticket/:id')
  findOne(@Param('id') id: string) {
    return this.ticketService.findOne(id);
  }

  @SetMetadata('permissions', [UserPermissions.UPDATE_TICKETS])
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
