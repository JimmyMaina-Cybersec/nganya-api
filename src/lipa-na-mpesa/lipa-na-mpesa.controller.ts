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
import { LipaNaMpesaService } from './lipa-na-mpesa.service';
import { LipaDto } from './dto/create-lipa-na-mpesa.dto';
import { LipaNaMpesaCallbackDto } from './dto/lipa-na-mpesa-callback.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtPayload } from 'src/types/jwt-payload';
import { CheckBalanceDTO } from './dto/checkBalance.dto';

@Controller('lipa-na-mpesa')
export class LipaNaMpesaController {
  constructor(private readonly lipaNaMpesaService: LipaNaMpesaService) {}

  @UseGuards(JwtGuard)
  @Post('send-stk')
  sendStk(
    @Body() createLipaNaMpesaDto: LipaDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.lipaNaMpesaService.sendStk(createLipaNaMpesaDto, user);
  }

  @Post('callback')
  mpesaCallback(@Body() createLipaNaMpesaDto: any) {
    return this.lipaNaMpesaService.mpesaCallback(createLipaNaMpesaDto);
  }

  @Post('check-balance')
  checkBalance(
    @CurrentUser() user: JwtPayload,
    @Body() checkBalanceDTO: CheckBalanceDTO,
  ) {
    return this.lipaNaMpesaService.getAccountBalance(user, checkBalanceDTO);
  }

  @Get()
  findAll() {
    return this.lipaNaMpesaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lipaNaMpesaService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLipaNaMpesaDto: LipaNaMpesaCallbackDto,
  ) {
    return this.lipaNaMpesaService.update(+id, updateLipaNaMpesaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lipaNaMpesaService.remove(+id);
  }
}
