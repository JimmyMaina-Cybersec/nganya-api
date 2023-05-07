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
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtPayload } from 'src/types/jwt-payload';

@UseGuards(JwtGuard)
@Controller('stations')
export class StationsController {
  constructor(
    private readonly stationsService: StationsService,
  ) {}

  @Post('add-station')
  create(
    @Body() createStationDto: CreateStationDto,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    return this.stationsService.createSacco(
      createStationDto,
      currentUser,
    );
  }

  @Get()
  findAll(@CurrentUser() currentUser: JwtPayload) {
    return this.stationsService.findAll(currentUser);
  }

  @Get('my-station')
  myStation(@CurrentUser('station') stationID: string) {
    return this.stationsService.myStation(stationID);
  }

  @Get(':id')
  findOneStation(
    @CurrentUser() currentUser: JwtPayload,
    @Param('id') id: string,
  ) {
    return this.stationsService.findOneStation(
      currentUser,
      id,
    );
  }

  @Patch('update-station/:id')
  update(
    @Param('id') id: string,
    @Body() updateStationDto: UpdateStationDto,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    return this.stationsService.updateStation(
      currentUser,
      updateStationDto,
      id,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stationsService.remove(+id);
  }
}
