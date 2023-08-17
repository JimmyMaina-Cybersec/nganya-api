import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportsService {
  findAll() {
    return `This action returns all reports`;
  }
}
