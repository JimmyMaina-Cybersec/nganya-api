import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  SetMetadata,
  Query,
} from '@nestjs/common';
import { AvailabilitiesService } from './availabilities.service';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { DeleteAvailabilitDto } from './dto/delete-Availability.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtPayload } from 'src/types/jwt-payload';
import { Pagination } from 'src/common/decorators/paginate.decorator';
import PaginationQueryType from 'src/types/paginationQuery';
import { AuthGuard } from '@nestjs/passport';
import { UserPermissions } from 'src/types/PermissionType';

@UseGuards(AuthGuard('jwt'))
@Controller('availabilities')
export class AvailabilitiesController {
  constructor(private readonly availabilitiesService: AvailabilitiesService) { }

  @SetMetadata('permission', UserPermissions.CREATE_AVAILABILITIES)
  @Post('add-availability')
  create(
    @Body() createAvailabilityDto: CreateAvailabilityDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.availabilitiesService.create(createAvailabilityDto, user);
  }

  @SetMetadata('permission', UserPermissions.READ_AVAILABILITIES)
  @Get()
  findAll(
    @CurrentUser() user: JwtPayload,
    @Query() filters: {
      status?: string,
    },
  ) {
    return this.availabilitiesService.findAll(user, filters);
  }


  @SetMetadata('permission', UserPermissions.READ_AVAILABILITIES)
  @Get(':id')
  findOne(
    @Param('availability/id') id: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.availabilitiesService.findOne(id, user);
  }

  @SetMetadata('permission', UserPermissions.UPDATE_AVAILABILITIES)
  @Patch('update-availability/:id')
  update(
    @Param('id') id: string,
    @Body() updateAvailabilityDto: UpdateAvailabilityDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.availabilitiesService.update(id, updateAvailabilityDto, user);
  }

  @SetMetadata('permission', UserPermissions.DELETE_AVAILABILITIES)
  @Delete('delete-availability')
  remove(
    @Body() deleteAvailabilitDto: DeleteAvailabilitDto,
    @CurrentUser() user: JwtPayload,
  ) {
    const { id } = deleteAvailabilitDto;
    return this.availabilitiesService.deleteAvalablity(id, user);
  }
}



