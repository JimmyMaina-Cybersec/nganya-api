import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SaccosService } from './saccos.service';
import { CreateSaccoDto } from './dto/create-sacco.dto';
import { UpdateSaccoDto } from './dto/update-sacco.dto';

@Controller('saccos')
export class SaccosController {
  constructor(private readonly saccosService: SaccosService) {}

  @Post()
  create(@Body() createSaccoDto: CreateSaccoDto) {
    return this.saccosService.create(createSaccoDto);
  }

  @Get()
  findAll() {
    return this.saccosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saccosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaccoDto: UpdateSaccoDto) {
    return this.saccosService.update(+id, updateSaccoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saccosService.remove(+id);
  }
}
