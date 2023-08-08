import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtPayload } from 'src/types/jwt-payload';
import { Pagination } from 'src/common/decorators/paginate.decorator';
import PaginationQueryType from 'src/types/paginationQuery';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UseGuards(JwtGuard)
  @Get()
  findAll(
    @CurrentUser() user: JwtPayload,
    @Query('transactionMethod') transactionMethod: string,
    @Query('transactionType') transactionType: string,
    @Query('agent') agent: string,
    @Query('station') station: string,
    @Pagination() pagination: PaginationQueryType,
  ) {
    return this.paymentsService.findAll(
      user,
      transactionMethod,
      transactionType,
      agent,
      station,
      pagination,
    );
  }

  // @Get('lipa-na-mpesa')
  // findAllLipaNaMpesa(
  //   @CurrentUser() user: JwtPayload,
  //   @Pagination() pagination: PaginationQueryType,
  // ) {
  //   return this.paymentsService.findAllLipaNaMpesa(user, pagination);
  // }

  @Post('lipa-na-mpesa')
  sendStk(
    @CurrentUser() user: JwtPayload,
    @Body() createPaymentDto: CreatePaymentDto,
  ) {
    return this.paymentsService.sendStk(user, createPaymentDto);
  }

  // @Post('cash-payment'){

  // }
}
