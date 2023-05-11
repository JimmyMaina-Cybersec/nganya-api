import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LipaNaMpesaService } from './lipa-na-mpesa.service';
import { CreateLipaNaMpesaDto } from './dto/create-lipa-na-mpesa.dto';
import { UpdateLipaNaMpesaDto } from './dto/update-lipa-na-mpesa.dto';

@Controller('lipa-na-mpesa')
export class LipaNaMpesaController {
  constructor(private readonly lipaNaMpesaService: LipaNaMpesaService) {}

  @Post()
  create(@Body() createLipaNaMpesaDto: CreateLipaNaMpesaDto) {
    return this.lipaNaMpesaService.create(createLipaNaMpesaDto);
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
  update(@Param('id') id: string, @Body() updateLipaNaMpesaDto: UpdateLipaNaMpesaDto) {
    return this.lipaNaMpesaService.update(+id, updateLipaNaMpesaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lipaNaMpesaService.remove(+id);
  }
}
