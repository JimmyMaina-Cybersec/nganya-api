import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { JwtPayload } from 'src/types/jwt-payload';
import { ObjectId } from 'mongodb';

@UseGuards(JwtGuard)
@Controller('profile')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
  ) {}

  @Get()
  findOne(@CurrentUser('_id') id: ObjectId) {
    return this.profileService.myProfile(id);
  }

  @Patch('update')
  update(@Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(updateProfileDto);
  }
}
