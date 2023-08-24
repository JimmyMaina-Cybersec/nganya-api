import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { TestAuthService } from './test-auth.service';
import { CreateTestAuthDto } from './dto/create-test-auth.dto';
import { UpdateTestAuthDto } from './dto/update-test-auth.dto';
import { AuthorizationGuard } from '../auth/guards/authorization-guard.service';
import { PermissionsGuard } from '../auth/guards/permissions/permissions.guard';
import {
  CurrentUser,
  OldCurrentUser,
} from 'src/common/decorators/current-user.decorator';
import { JwtPayload, OldJwtPayload } from 'src/types/jwt-payload';

@Controller('test-auth')
export class TestAuthController {
  constructor(private readonly testAuthService: TestAuthService) {}

  @Post()
  create(@Body() createTestAuthDto: CreateTestAuthDto) {
    return this.testAuthService.create(createTestAuthDto);
  }

  @UseGuards(AuthorizationGuard, PermissionsGuard)
  @SetMetadata('permissions', ['read:test-auth'])
  @Get()
  findAll(@CurrentUser() currentUser: JwtPayload) {
    return this.testAuthService.findAll(currentUser);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testAuthService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTestAuthDto: UpdateTestAuthDto,
  ) {
    return this.testAuthService.update(+id, updateTestAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testAuthService.remove(+id);
  }
}
