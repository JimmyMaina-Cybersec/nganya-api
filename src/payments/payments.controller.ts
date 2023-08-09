import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtPayload } from 'src/types/jwt-payload';
import { Pagination } from 'src/common/decorators/paginate.decorator';
import PaginationQueryType from 'src/types/paginationQuery';
import { TransactionType } from 'src/types/transactionMethod';
import { AuthGuard } from '@nestjs/passport';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(
    @CurrentUser() user: JwtPayload,
    @Query('transactionType') transactionType: TransactionType,
    @Pagination() pagination: PaginationQueryType,
  ) {
    return this.paymentsService.findAll(user, transactionType, pagination);
  }

  @Get('lipa-na-mpesa')
  findAllLipaNaMpesa(
    @CurrentUser() user: JwtPayload,
    @Pagination() pagination: PaginationQueryType,
  ) {
    return this.paymentsService.findAllLipaNaMpesa(user, pagination);
  }

  @Post('lipa-na-mpesa')
  sendStk(
    @CurrentUser() user: JwtPayload,
    @Body() createPaymentDto: CreatePaymentDto,
  ) {
    return this.paymentsService.sendStk(user, createPaymentDto);
  }

  @Post('callback')
  mpesaCallback(@Body() createLipaNaMpesaDto: any) {
    return this.paymentsService.mpesaCallback(createLipaNaMpesaDto);
  }

  @Patch('confirm-lipa-na-mpesa/:id')
  update(@CurrentUser() user: JwtPayload, @Param('id') id: string) {
    return this.paymentsService.update(user, id);
  }

  // @Post('cash-payment'){

  // }
}
