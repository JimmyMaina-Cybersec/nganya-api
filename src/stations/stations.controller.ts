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
import { StationsService } from './stations.service';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';
import { AuthGuard } from '@nestjs/passport';
import { OldCurrentUser } from 'src/common/decorators/current-user.decorator';
import { OldJwtPayload } from 'src/types/jwt-payload';
import { Pagination } from 'src/common/decorators/paginate.decorator';
import PaginationQueryType from 'src/types/paginationQuery';

@UseGuards(AuthGuard('jwt'))
@Controller('stations')
export class StationsController {
  constructor(private readonly stationsService: StationsService) { }

  @Post('add-station')
  create(
    @Body() createStationDto: CreateStationDto,
    @OldCurrentUser() currentUser: OldJwtPayload,
  ) {
    return this.stationsService.createSacco(createStationDto, currentUser);
  }

  @Get()
  findAll(
    @OldCurrentUser() currentUser: OldJwtPayload,
    @Pagination() pagination: PaginationQueryType,
  ) {
    return this.stationsService.findAll(currentUser, pagination);
  }

  @Get('my-station')
  myStation(@OldCurrentUser('station') stationID: string) {
    return this.stationsService.myStation(stationID);
  }

  @Get(':id')
  findOneStation(
    @OldCurrentUser() currentUser: OldJwtPayload,
    @Param('id') id: string,
  ) {
    return this.stationsService.findOneStation(currentUser, id);
  }

  @Patch('update-station/:id')
  update(
    @Param('id') id: string,
    @Body() updateStationDto: UpdateStationDto,
    @OldCurrentUser() currentUser: OldJwtPayload,
  ) {
    return this.stationsService.updateStation(
      currentUser,
      updateStationDto,
      id,
    );
  }

  @Delete('delete-station/:id')
  remove(@Param('id') id: string, @OldCurrentUser() currentUser: OldJwtPayload) {
    return this.stationsService.remove(id, currentUser);
  }
}
