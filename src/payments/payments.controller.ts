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
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}
  
  @UseGuards(JwtGuard)
  @Post('lipa-na-mpesa'){
    
  }
  @Post('mpesa-till-number'){
    
  }
  @Post('cash-payment'){
    
  }
  
}
