import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AvailabilitiesService } from './availabilities.service';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtPayload } from 'src/types/jwt-payload';

@UseGuards(JwtGuard)
@Controller('availabilities')
export class AvailabilitiesController {
  constructor(private readonly availabilitiesService: AvailabilitiesService) {}

  @Post('add-availability')
  create(
    @Body() createAvailabilityDto: CreateAvailabilityDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.availabilitiesService.create(createAvailabilityDto, user);
  }

  @Get()
  findAll(@CurrentUser() user: JwtPayload) {
    return this.availabilitiesService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.availabilitiesService.findOne(id, user);
  }

  @Patch('update-availability/:id')
  update(
    @Param('id') id: string,
    @Body() updateAvailabilityDto: UpdateAvailabilityDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.availabilitiesService.update(id, updateAvailabilityDto, user);
  }

  @Delete('delete-availability/:id')
  remove(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.availabilitiesService.remove(id, user);
  }
}
