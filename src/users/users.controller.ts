import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtPayload } from 'src/types/jwt-payload';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Pagination } from 'src/common/decorators/paginate.decorator';
import PaginationQueryType from 'src/types/paginationQuery';
import { AuthorizationGuard } from '../auth/guards/authorization-guard.service';
import { PermissionsGuard } from '../auth/guards/permissions/permissions.guard';
import { UserPermissions } from '../types/PermissionType';
import { CreateSaccoUserDto } from './dto/create-sacco-user.dto';
import AssignStationManageDto from './dto/assign-sation-manage.dto';

@UseGuards(AuthorizationGuard, PermissionsGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @SetMetadata('permissions', [UserPermissions.CREATE_SACCO_USERS])
  @Post('create/user')
  createUser(
    @CurrentUser() currentUser: JwtPayload,
    @Body() createUserDto: CreateSaccoUserDto,
  ) {
    return this.usersService.createSaccoUsers(currentUser, createUserDto);
  }

  @SetMetadata('permissions', [UserPermissions.CREATE_ADMINS])
  @Post('create/admin')
  createAdmins(
    @CurrentUser() currentUser: JwtPayload,
    @Body() createUserDto: CreateSaccoUserDto,
  ) {
    return this.usersService.createAdmins(currentUser, createUserDto);
  }

  @SetMetadata('permissions', [UserPermissions.CREATE_SERVICE_AGENTS])
  @Post('create/agent')
  createService(
    @CurrentUser() currentUser: JwtPayload,
    @Body() createUserDto: CreateSaccoUserDto,
  ) {
    return this.usersService.createServiceAgent(currentUser, createUserDto);
  }

  @SetMetadata('permissions', [UserPermissions.READ_SACCO_USERS])
  @Get()
  findAll(
    @CurrentUser() currentUser: JwtPayload,
    @Query() pagination: PaginationQueryType,
    @Query() filters: { role: string; station: string },
  ) {
    return this.usersService.findAllUsers(currentUser, pagination, filters);
  }

  @SetMetadata('permissions', [UserPermissions.READ_ADMINS])
  @Get('administrators')
  findAllAdmins(
    @CurrentUser() currentUser: JwtPayload,
    @Query() pagination: PaginationQueryType,
  ) {
    return this.usersService.findAllAdmins(currentUser, pagination);
  }

  @SetMetadata('permissions', [UserPermissions.READ_STATION_MANAGERS])
  @Get('managers')
  findAllManagers(
    @CurrentUser() currentUser: JwtPayload,
    @Query() pagination: PaginationQueryType,
  ) {
    return this.usersService.findAllManagers(currentUser, pagination);
  }

  @SetMetadata('permissions', [UserPermissions.READ_SERVICE_AGENTS])
  @Get('agents')
  findAllAgents(
    @CurrentUser() currentUser: JwtPayload,
    @Pagination() pagination: PaginationQueryType,
  ) {
    return this.usersService.findAllAgents(currentUser, pagination);
  }

  @SetMetadata('permissions', [UserPermissions.READ_DRIVERS])
  @Get('drivers')
  findAllDrivers(
    @CurrentUser() currentUser: JwtPayload,
    @Pagination() pagination: PaginationQueryType,
  ) {
    return this.usersService.findAllDrivers(currentUser, pagination);
  }

  @Patch('update-user/:id')
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    return this.usersService.updateUser(id, updateUserDto, currentUser);
  }

  @Delete('delete-user/:id')
  deleteUser(@Param('id') id: string, @CurrentUser() currentUser: JwtPayload) {
    return this.usersService.deleteUser(id, currentUser);
  }

  @SetMetadata('permissions', [UserPermissions.ASSIGN_SERVICE_AGENT])
  @Patch('assign-agent')
  assignAgentToStation(
    @Body() body: AssignStationManageDto,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    return this.usersService.assignUserToStation(body, currentUser);
  }

  @SetMetadata('permissions', [UserPermissions.ASSIGN_STATION_MANAGER])
  @Patch('assign-manager')
  assignManager(
    @Body() body: AssignStationManageDto,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    return this.usersService.assignManagerToStation(body, currentUser);
  }
}
