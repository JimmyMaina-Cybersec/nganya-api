import { Injectable, Post } from '@nestjs/common';
import { CreateAuthDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  signIn(createAuthDto: CreateAuthDto) {
    return `This action returns all auth`;
  }
  signOut() {}
}
