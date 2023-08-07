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
import { VehicleOwnersService } from './vehicle-owners.service';
import { CreateVehicleOwnerDto } from './dto/create-vehicle-owner.dto';
import { UpdateVehicleOwnerDto } from './dto/update-vehicle-owner.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtPayload } from 'src/types/jwt-payload';
import { Pagination } from 'src/common/decorators/paginate.decorator';
import PaginationQueryType from 'src/types/paginationQuery';

@UseGuards(JwtGuard)
@Controller('vehicle-owners')
export class VehicleOwnersController {
  constructor(private readonly vehicleOwnersService: VehicleOwnersService) {}

  @Post('add-vehicle-owner')
  addVehicleOwner(
    @Body() createVehicleOwnerDto: CreateVehicleOwnerDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.vehicleOwnersService.addVehicleOwner(
      createVehicleOwnerDto,
      user,
    );
  }

  @Get()
  findAll(
    @CurrentUser() user: JwtPayload,
    @Pagination() pagination: PaginationQueryType,
  ) {
    return this.vehicleOwnersService.findAll(user, pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.vehicleOwnersService.findOne(id, user);
  }

  @Patch('upadate-vehicle-owner/:id')
  update(
    @Param('id') id: string,
    @Body() updateVehicleOwnerDto: UpdateVehicleOwnerDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.vehicleOwnersService.update(id, updateVehicleOwnerDto, user);
  }

  @Delete('delete/:id')
  deleteVehicleOwner(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.vehicleOwnersService.deleteVehicleOwner(id, user);
  }
}
