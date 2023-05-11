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
import { CreateLipaNaMpesaDto } from './dto/create-lipa-na-mpesa.dto';
import { UpdateLipaNaMpesaDto } from './dto/update-lipa-na-mpesa.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtPayload } from 'src/types/jwt-payload';

@Controller('lipa-na-mpesa')
export class LipaNaMpesaController {
  constructor(private readonly lipaNaMpesaService: LipaNaMpesaService) {}

  @UseGuards(JwtGuard)
  @Post('send-stk')
  sendStk(
    @Body() createLipaNaMpesaDto: CreateLipaNaMpesaDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.lipaNaMpesaService.sendStk(createLipaNaMpesaDto, user);
  }

  @Post('callback')
  mpesaCallback(@Body() createLipaNaMpesaDto: any) {
    return this.lipaNaMpesaService.mpesaCallback(createLipaNaMpesaDto);
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
    @Body() updateLipaNaMpesaDto: UpdateLipaNaMpesaDto,
  ) {
    return this.lipaNaMpesaService.update(+id, updateLipaNaMpesaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lipaNaMpesaService.remove(+id);
  }
}
