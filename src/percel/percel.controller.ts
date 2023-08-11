import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { PercelService } from './percel.service';
import { CreatePercelDto } from './dto/create-percel.dto';
import { UpdatePercelDto } from './dto/update-percel.dto';
import { AuthGuard } from '@nestjs/passport';
import { OldCurrentUser } from 'src/common/decorators/current-user.decorator';
import { OldJwtPayload } from 'src/types/jwt-payload';

import { Pagination } from '../common/decorators/paginate.decorator';
import PaginationQueryType from 'src/types/paginationQuery';

@UseGuards(AuthGuard('jwt'))
@Controller('percels')
export class PercelController {
  constructor(private readonly percelService: PercelService) { }

  @Post('send')
  sendPercel(
    @Body() createPercelDto: CreatePercelDto,
    @OldCurrentUser() agent: OldJwtPayload,
  ) {
    return this.percelService.sendPercel(createPercelDto, agent);
  }

  @Get()
  findAll(
    @OldCurrentUser() user: OldJwtPayload,
    @Pagination() pagination: PaginationQueryType,
  ) {
    return this.percelService.findAll(user, pagination);
  }

  @Patch('upadate/:id')
  update(
    @Param('id') id: string,
    @Body() updatePercelDto: UpdatePercelDto,
    @OldCurrentUser() user: OldJwtPayload,
  ) {
    return this.percelService.update(user, id, updatePercelDto);
  }
}
