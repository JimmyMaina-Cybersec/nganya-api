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
import { SaccosService } from './saccos.service';
import { CreateSaccoDto } from './dto/create-sacco.dto';
import { UpdateSaccoDto } from './dto/update-sacco.dto';
import { AuthGuard } from '@nestjs/passport';
import { OldCurrentUser } from 'src/common/decorators/current-user.decorator';
import { OldJwtPayload } from 'src/types/jwt-payload';
import { Pagination } from 'src/common/decorators/paginate.decorator';
import PaginationQueryType from 'src/types/paginationQuery';

@UseGuards(AuthGuard('jwt'))
@Controller('saccos')
export class SaccosController {
  constructor(private readonly saccosService: SaccosService) { }

  @Post()
  create(
    @Body() createSaccoDto: CreateSaccoDto,
    @OldCurrentUser() user: OldJwtPayload,
  ) {
    return this.saccosService.create(createSaccoDto, user);
  }

  @Get()
  findAll(
    @OldCurrentUser() user: OldJwtPayload,
    @Pagination() pagination: PaginationQueryType,
  ) {
    return this.saccosService.findAll(user, pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @OldCurrentUser() user: OldJwtPayload) {
    return this.saccosService.findOne(id, user);
  }

  @Patch('update-sacco/:id')
  update(
    @Param('id') id: string,
    @Body() updateSaccoDto: UpdateSaccoDto,
    @OldCurrentUser() user: OldJwtPayload,
  ) {
    return this.saccosService.updateSacco(id, updateSaccoDto, user);
  }

  @Delete('delete-sacco/:id')
  remove(@Param('id') id: string, @OldCurrentUser() user: OldJwtPayload) {
    return this.saccosService.remove(id, user);
  }
}
