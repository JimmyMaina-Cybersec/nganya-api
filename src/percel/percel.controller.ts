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
import { PercelService } from './percel.service';
import { CreatePercelDto } from './dto/create-percel.dto';
import { UpdatePercelDto } from './dto/update-percel.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtPayload } from 'src/types/jwt-payload';

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
  findAll(@Query() query: any, @CurrentUser() user: JwtPayload) {
    return this.percelService.findAll(user, query);
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
