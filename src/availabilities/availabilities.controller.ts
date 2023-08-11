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
import { DeleteAvailabilitDto } from './dto/delete-Availability.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';
import { OldCurrentUser } from 'src/common/decorators/current-user.decorator';
import { OldJwtPayload } from 'src/types/jwt-payload';
import { Pagination } from 'src/common/decorators/paginate.decorator';
import PaginationQueryType from 'src/types/paginationQuery';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('availabilities')
export class AvailabilitiesController {
  constructor(private readonly availabilitiesService: AvailabilitiesService) { }

  @Post('add-availability')
  create(
    @Body() createAvailabilityDto: CreateAvailabilityDto,
    @OldCurrentUser() user: OldJwtPayload,
  ) {
    return this.availabilitiesService.create(createAvailabilityDto, user);
  }

  @Get()
  findAll(
    @OldCurrentUser() user: OldJwtPayload,
    @Pagination() pagination: PaginationQueryType,
  ) {
    return this.availabilitiesService.findAll(user, pagination);
  }

  @Get(':id')
  findOne(
    @Param('availability/id') id: string,
    @OldCurrentUser() user: OldJwtPayload,
  ) {
    return this.availabilitiesService.findOne(id, user);
  }

  @Patch('update-availability/:id')
  update(
    @Param('id') id: string,
    @Body() updateAvailabilityDto: UpdateAvailabilityDto,
    @OldCurrentUser() user: OldJwtPayload,
  ) {
    return this.availabilitiesService.update(id, updateAvailabilityDto, user);
  }

  @Delete('delete-availability')
  remove(
    @Body() deleteAvailabilitDto: DeleteAvailabilitDto,
    @OldCurrentUser() user: OldJwtPayload,
  ) {
    const { id } = deleteAvailabilitDto;
    return this.availabilitiesService.deleteAvalablity(id, user);
  }
}
