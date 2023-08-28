import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtPayload } from 'src/types/jwt-payload';
import { UserPermissions } from 'src/types/PermissionType';

@UseGuards(AuthGuard('jwt'))
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @SetMetadata('permissions', [UserPermissions.CREATE_CATEGORY])
  @Post('add-category')
  createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.categoriesService.createCategory(createCategoryDto, user);
  }

  @SetMetadata('permissions', [UserPermissions.READ_CATEGORY])
  @Get('all-categories')
  findAll() {
    return this.categoriesService.findAll();
  }

  @SetMetadata('permissions', [UserPermissions.UPDATE_CATEGORY])
  @Patch('update-category/:categoryId')
  updateCategory(
    @Param('categoryId') categoryId: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.categoriesService.updateCategory(
      categoryId,
      updateCategoryDto,
      user,
    );
  }

  @SetMetadata('permissions', [UserPermissions.DELETE_CATEGORY])
  @Delete('delete-category/:id')
  removeCategory(@Param('id') id: string) {
    return this.categoriesService.removeCategory(id);
  }
}
