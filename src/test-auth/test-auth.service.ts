import { Injectable } from '@nestjs/common';
import { CreateTestAuthDto } from './dto/create-test-auth.dto';
import { UpdateTestAuthDto } from './dto/update-test-auth.dto';
import { JwtPayload, OldJwtPayload } from 'src/types/jwt-payload';

@Injectable()
export class TestAuthService {
  create(createTestAuthDto: CreateTestAuthDto) {
    return 'This action adds a new testAuth';
  }

  findAll(user: JwtPayload) {
    console.log(user);

    return user;
  }

  findOne(id: number) {
    return `This action returns a #${id} testAuth`;
  }

  update(id: number, updateTestAuthDto: UpdateTestAuthDto) {
    return `This action updates a #${id} testAuth`;
  }

  remove(id: number) {
    return `This action removes a #${id} testAuth`;
  }
}
