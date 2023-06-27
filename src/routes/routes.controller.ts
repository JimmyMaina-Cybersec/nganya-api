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
import { RoutesService } from './routes.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtPayload } from 'src/types/jwt-payload';
import { DeleteResult } from 'mongodb';

@UseGuards(JwtGuard)
@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Post('add-route')
  create(
    @Body() createRouteDto: CreateRouteDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.routesService.create(createRouteDto, user);
  }

  @Get()
  findAll(@Query() query: any, @CurrentUser() user: JwtPayload) {
    return this.routesService.findAll(query, user);
  }

  @Get('route/:id')
  findOne(@Param('id') id: string) {
    return this.routesService.findOne(+id);
  }

  @Patch('update-route/:id')
  update(
    @Param('id') id: string,
    @Body() updateRouteDto: UpdateRouteDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.routesService.update(id, updateRouteDto, user);
  }

  @Delete('delete-route/:id')
  remove(@Param('id') id: string, @CurrentUser() user: JwtPayload): Promise<DeleteResult> {
    return this.routesService.remove(id, user);
  }
}
