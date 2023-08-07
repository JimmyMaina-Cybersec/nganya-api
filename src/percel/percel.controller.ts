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
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtPayload } from 'src/types/jwt-payload';

import { Pagination } from '../common/decorators/paginate.decorator';
import PaginationQueryType from 'src/types/paginationQuery';

@UseGuards(JwtGuard)
@Controller('percels')
export class PercelController {
  constructor(private readonly percelService: PercelService) {}

  @Post('send')
  sendPercel(
    @Body() createPercelDto: CreatePercelDto,
    @CurrentUser() agent: JwtPayload,
  ) {
    return this.percelService.sendPercel(createPercelDto, agent);
  }

  @Get()
  findAll(
    @CurrentUser() user: JwtPayload,
    @Pagination() pagination: PaginationQueryType,
  ) {
    return this.percelService.findAll(user, pagination);
  }

  @Patch('upadate/:id')
  update(
    @Param('id') id: string,
    @Body() updatePercelDto: UpdatePercelDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.percelService.update(user, id, updatePercelDto);
  }
}
