import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { OldJwtPayload } from "src/types/jwt-payload";
import { OldCurrentUser } from "src/common/decorators/current-user.decorator";
import { FindStationAgentsDto } from "./dto/find-station-agents.dto";
import { Pagination } from "src/common/decorators/paginate.decorator";
import PaginationQueryType from "src/types/paginationQuery";

// @UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('create-user')
  createUser() {
    return this.usersService.createUser();
  }

  @Post('add-user')
  create(
    @Body() createUserDto: CreateUserDto,
    @OldCurrentUser() currentUser: OldJwtPayload,
  ) {
    return this.usersService.addUser(createUserDto, currentUser);
  }

  @Get()
  findAll(
    @OldCurrentUser() currentUser: OldJwtPayload,
    @Pagination() pagination: PaginationQueryType,
  ) {
    return this.usersService.findAllUsers(currentUser, pagination);
  }

  @Get('user/:id')
  findOne(@Param('id') id: string, @OldCurrentUser() currentUser: OldJwtPayload) {
    return this.usersService.findUser(id, currentUser);
  }

  @Get('find-by-id')
  findById(
    @Query() idNo: { idNo: string },
    @OldCurrentUser() currentUser: OldJwtPayload,
  ) {
    return this.usersService.findUserById(idNo, currentUser);
  }

  @Patch('update-user/:id')
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @OldCurrentUser() currentUser: OldJwtPayload,
  ) {
    return this.usersService.updateUser(id, updateUserDto, currentUser);
  }

  @Delete('delete-user/:id')
  deleteUser(@Param('id') id: string, @OldCurrentUser() currentUser: OldJwtPayload) {
    return this.usersService.deleteUser(id, currentUser);
  }

  @Get('station-agents')
  findAgentsInStation(
    @OldCurrentUser() currentUser: OldJwtPayload,
    @Query() station: FindStationAgentsDto,
  ) {
    return this.usersService.findAgentsInStation(currentUser, station);
  }

  @Get('station-manager')
  findStationManager(
    @OldCurrentUser() currentUser: OldJwtPayload,
    @Query() station: { station: string },
  ) {
    return this.usersService.findStationManager(currentUser, station);
  }

  @Patch('assign-station-manager')
  assingManager(
    @Query() queryData: { station: string; userId: string },
    @OldCurrentUser() currentUser: OldJwtPayload,
  ) {
    return this.usersService.assingManager(queryData, currentUser);
  }
}
