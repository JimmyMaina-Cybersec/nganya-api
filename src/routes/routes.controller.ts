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
import { RoutesService } from './routes.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import {
  CurrentUser,
  OldCurrentUser,
} from 'src/common/decorators/current-user.decorator';
import { JwtPayload, OldJwtPayload } from 'src/types/jwt-payload';
import { DeleteResult } from 'mongodb';
import { AuthorizationGuard } from '../auth/guards/authorization-guard.service';
import { PermissionsGuard } from '../auth/guards/permissions/permissions.guard';
import { UserPermissions } from '../types/PermissionType';

@UseGuards(AuthorizationGuard, PermissionsGuard)
@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @SetMetadata('permissions', [UserPermissions.CREATE_ROUTES])
  @Post('add-route')
  create(
    @Body() createRouteDto: CreateRouteDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.routesService.create(createRouteDto, user);
  }

  @Get()
  findAll(@Query() query: any, @OldCurrentUser() user: OldJwtPayload) {
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
    @OldCurrentUser() user: OldJwtPayload,
  ) {
    return this.routesService.update(id, updateRouteDto, user);
  }

  @Delete('delete-route/:id')
  remove(
    @Param('id') id: string,
    @OldCurrentUser() user: OldJwtPayload,
  ): Promise<DeleteResult> {
    return this.routesService.remove(id, user);
  }
}
