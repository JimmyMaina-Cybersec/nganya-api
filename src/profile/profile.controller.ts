import { Controller, Get, Body, Patch, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { OldCurrentUser } from 'src/common/decorators/current-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { OldJwtPayload } from 'src/types/jwt-payload';

@UseGuards(AuthGuard('jwt'))
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  @Get()
  findOne(@OldCurrentUser() id: OldJwtPayload) {
    return this.profileService.myProfile(id);
  }

  @Patch('update-profile')
  update(
    @Body() updateProfileDto: UpdateProfileDto,
    @OldCurrentUser() user: OldJwtPayload,
  ) {
    return this.profileService.update(updateProfileDto, user);
  }
}
