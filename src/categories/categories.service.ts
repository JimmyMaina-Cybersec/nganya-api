import { HttpException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './entities/category.entity';
import { Model } from 'mongoose';
import { JwtPayload } from 'src/types/jwt-payload';
import { Station } from 'src/stations/schema/station.schema';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(Station.name) private stationModel: Model<Station>,
  ) {}
  async createCategory(createCategoryDto: CreateCategoryDto, user: JwtPayload) {
    try {
      console.log(user);

      await this.categoryModel.create({
        ...createCategoryDto,
        addedBy: user.sub,
      });

      return {
        message: 'Category created successfully',
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll() {
    try {
      const categories = await this.categoryModel.find().exec();
      return {
        message: 'Categories fetched successfully',
        categories,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async updateCategory(
    categoryId: string,
    updateCategoryDto: UpdateCategoryDto,
    user: JwtPayload,
  ) {
    try {
      const categoryToUpdate = await this.categoryModel.findByIdAndUpdate(
        {
          _id: categoryId,
        },
        { ...updateCategoryDto, updatedBy: user.sub },
        { new: true },
      );
      return {
        message: 'Category updated successfully',
        category: categoryToUpdate,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async addCategoryToStation(categoryId: string, user: JwtPayload) {
    try {
      const category = await this.categoryModel.findById(categoryId);
      if (!category) {
        throw new HttpException('Category does not exist', 404);
      }
      const categoryToAdd = {
        category: category.categoryName,
      };
      const stationToUpdate = await this.stationModel.findOneAndUpdate(
        {
          _id: user.user_metadata.station,
        },
        { $push: { parcelCategories: categoryToAdd } },
        { new: true },
      );
      return {
        message: 'Category added to station successfully',
        station: stationToUpdate,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async removeCategoryFromStation(categoryId: string, user: JwtPayload) {
    try {
      const category = await this.categoryModel.findById(categoryId);
      if (!category) {
        throw new HttpException('Category does not exist', 404);
      }

      const stationToUpdate = await this.stationModel.findOneAndUpdate(
        {
          _id: user.user_metadata.station,
        },
        { $pull: { parcelCategories: category.categoryName } },
        { new: true },
      );
      return {
        message: 'Category removed from station successfully',
        station: stationToUpdate,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async removeCategory(id: string) {
    try {
      await this.categoryModel.findByIdAndDelete(id);
      return {
        message: 'Category deleted successfully',
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
