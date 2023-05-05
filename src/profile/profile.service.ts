import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  findAll() {
    return `This action returns all profile`;
  }

  myProfile(id: number) {
    return `This action returns a #${id} profile`;
  }

  update(updateProfileDto: UpdateProfileDto) {
    return `This action updates my profile`;
  }
}
