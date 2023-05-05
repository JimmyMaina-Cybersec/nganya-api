import { Injectable } from '@nestjs/common';
import { CreateSaccoDto } from './dto/create-sacco.dto';
import { UpdateSaccoDto } from './dto/update-sacco.dto';

@Injectable()
export class SaccosService {
  create(createSaccoDto: CreateSaccoDto) {
    return 'This action adds a new sacco';
  }

  findAll() {
    return `This action returns all saccos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sacco`;
  }

  update(id: number, updateSaccoDto: UpdateSaccoDto) {
    return `This action updates a #${id} sacco`;
  }

  remove(id: number) {
    return `This action removes a #${id} sacco`;
  }
}
