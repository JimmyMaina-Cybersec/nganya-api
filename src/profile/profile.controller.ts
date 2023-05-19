import { Controller, Get, Body, Patch, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { JwtPayload } from 'src/types/jwt-payload';

@UseGuards(JwtGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  findOne(@CurrentUser() id: JwtPayload) {
    return this.profileService.myProfile(id);
  }

  @Patch('update-profile')
  update(
    @Body() updateProfileDto: UpdateProfileDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.profileService.update(updateProfileDto, user);
  }
}
