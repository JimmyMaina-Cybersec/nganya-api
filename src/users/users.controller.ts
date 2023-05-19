import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { JwtPayload } from 'src/types/jwt-payload';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { FindStationAgentsDto } from './dto/find-station-agents.dto';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('add-user')
  create(
    @Body() createUserDto: CreateUserDto,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    return this.usersService.addUser(createUserDto, currentUser);
  }

  @Get()
  findAll(
    @CurrentUser() currentUser: JwtPayload,
    @Query() query: any,
  ) {
    return this.usersService.findAllUsers(currentUser, query);
  }

  @Get('user/:id')
  findOne(
    @Param('id') id: string,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    return this.usersService.findUser(id, currentUser);
  }

  @Get('find-by-id')
  findById(
    @Query() idNo: { idNo: string },
    @CurrentUser() currentUser: JwtPayload,
  ) {
    return this.usersService.findUserById(idNo, currentUser);
  }

  @Patch('update-user/:id')
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    return this.usersService.updateUser(
      id,
      updateUserDto,
      currentUser,
    );
  }

  @Delete('delete-user/:id')
  deleteUser(
    @Param('id') id: string,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    return this.usersService.deleteUser(id, currentUser);
  }

  @Get('station-agents')
  findAgentsInStation(
    @CurrentUser() currentUser: JwtPayload,
    @Query() station: FindStationAgentsDto,
  ) {
    return this.usersService.findAgentsInStation(
      currentUser,
      station,
    );
  }

  @Get('station-manager')
  findStationManager(
    @CurrentUser() currentUser: JwtPayload,
    @Query() station: { station: string },
  ) {
    return this.usersService.findStationManager(currentUser, station);
  }

  @Patch('assign-station-manager')
  assingManager(
    @Query() queryData: { station: string; userId: string },
    @CurrentUser() currentUser: JwtPayload,
  ) {
    return this.usersService.assingManager(queryData, currentUser);
  }
}
