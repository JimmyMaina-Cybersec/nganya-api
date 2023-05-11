import { Injectable } from '@nestjs/common';
import { CreateLipaNaMpesaDto } from './dto/create-lipa-na-mpesa.dto';
import { UpdateLipaNaMpesaDto } from './dto/update-lipa-na-mpesa.dto';

@Injectable()
export class LipaNaMpesaService {
  create(createLipaNaMpesaDto: CreateLipaNaMpesaDto) {
    return 'This action adds a new lipaNaMpesa';
  }

  findAll() {
    return `This action returns all lipaNaMpesa`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lipaNaMpesa`;
  }

  update(id: number, updateLipaNaMpesaDto: UpdateLipaNaMpesaDto) {
    return `This action updates a #${id} lipaNaMpesa`;
  }

  remove(id: number) {
    return `This action removes a #${id} lipaNaMpesa`;
  }
}
