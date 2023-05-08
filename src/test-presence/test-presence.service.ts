import { Injectable } from '@nestjs/common';
import { CreateTestPresenceDto } from './dto/create-test-presence.dto';
import { UpdateTestPresenceDto } from './dto/update-test-presence.dto';

@Injectable()
export class TestPresenceService {
  create(createTestPresenceDto: CreateTestPresenceDto) {
    return 'This action adds a new testPresence';
  }

  findAll() {
    return `This action returns all testPresence`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testPresence`;
  }

  update(id: number, updateTestPresenceDto: UpdateTestPresenceDto) {
    return `This action updates a #${id} testPresence`;
  }

  remove(id: number) {
    return `This action removes a #${id} testPresence`;
  }
}
