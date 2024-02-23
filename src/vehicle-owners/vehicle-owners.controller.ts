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
} from '@nestjs/common';
import { VehicleOwnersService } from './vehicle-owners.service';
import { CreateVehicleOwnerDto } from './dto/create-vehicle-owner.dto';
import { UpdateVehicleOwnerDto } from './dto/update-vehicle-owner.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtPayload } from 'src/types/jwt-payload';
import { Pagination } from 'src/common/decorators/paginate.decorator';
import PaginationQueryType from 'src/types/paginationQuery';
import { UserPermissions } from 'src/types/PermissionType';
import { PermissionsGuard } from 'src/auth/guards/permissions/permissions.guard';
import { AuthorizationGuard } from 'src/auth/guards/authorization-guard.service';

@UseGuards(AuthorizationGuard, PermissionsGuard)
@Controller('vehicle-owners')
export class VehicleOwnersController {
  constructor(private readonly vehicleOwnersService: VehicleOwnersService) {}

  @SetMetadata('permissions', [UserPermissions.CREATE_VEHiCLE_OWNER])
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

  @SetMetadata('permissions', [UserPermissions.READ_VEHiCLE_OWNER])
  @Get()
  findAll(
    @CurrentUser() user: JwtPayload,
    @Pagination() pagination: PaginationQueryType,
  ) {
    return this.vehicleOwnersService.findAll(user, pagination);
  }

  @SetMetadata('permissions', [UserPermissions.READ_VEHiCLE_OWNER])
  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.vehicleOwnersService.findOne(id, user);
  }

  @SetMetadata('permissions', [UserPermissions.UPDATE_VEHiCLE_OWNER])
  @Patch('upadate-vehicle-owner/:id')
  update(
    @Param('id') id: string,
    @Body() updateVehicleOwnerDto: UpdateVehicleOwnerDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.vehicleOwnersService.update(id, updateVehicleOwnerDto, user);
  }

  @SetMetadata('permissions', [UserPermissions.DELETE_VEHiCLE_OWNER])
  @Delete('delete/:id')
  deleteVehicleOwner(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.vehicleOwnersService.deleteVehicleOwner(id, user);
  }
}
