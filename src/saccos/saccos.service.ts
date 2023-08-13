import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateSaccoDto } from './dto/create-sacco.dto';
import { UpdateSaccoDto } from './dto/update-sacco.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Sacco, SaccoDocument } from './schema/sacco.schema';
import { Model } from 'mongoose';
import { OldJwtPayload } from 'src/types/jwt-payload';
import PaginationQueryType from 'src/types/paginationQuery';

@Injectable()
export class SaccosService {
  constructor(
    @InjectModel(Sacco.name) private readonly saccoModel: Model<SaccoDocument>,
  ) { }

  async create(createSaccoDto: CreateSaccoDto, user: OldJwtPayload) {
    if (user.role === 'Super User') {
      const exists = await this.saccoModel.exists({
        name: createSaccoDto.name,
      });
      if (exists) {
        throw new HttpException(
          `Sacco with name ${createSaccoDto.name} already exists`,
          HttpStatus.BAD_REQUEST,
        );
      }
      await this.saccoModel.create({
        ...createSaccoDto,
        createdBy: user._id,
        updatedBy: user._id,
      });
      throw new HttpException('Sacco created successfully', HttpStatus.CREATED);
    }
    throw new HttpException(
      'You are not allowed to create a sacco',
      HttpStatus.FORBIDDEN,
    );
  }

  async findAll(user: OldJwtPayload, pagination: PaginationQueryType) {
    try {
      if (!user || !user.role) {
        throw new UnauthorizedException('You are not allowed to access Saccos');
      }

      if (user.role === 'Super User') {
        const { page, resPerPage } = pagination;

        const [Sacco, totalCount] = await Promise.all([
          this.saccoModel
            .find()
            .select('-__v')
            .skip(pagination.skip)
            .limit(pagination.resPerPage),
          this.saccoModel.countDocuments(),
        ]);
        return {
          data: Sacco,
          page,
          resPerPage,
          numberOfPages: Math.ceil(totalCount / resPerPage),
        };
      } else {
        throw new HttpException(
          'You are not allowed to view availabilities',
          HttpStatus.FORBIDDEN,
        );
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  findOne(id: string, user: OldJwtPayload) {
    if (user.role === 'Super User' || user.sacco === id) {
      return this.saccoModel.findById(id).select('-__v');
    }
    throw new HttpException(
      `You are not allowed to see Details of the selected  ${id} sacco`,
      HttpStatus.FORBIDDEN,
    );
  }

  updateSacco(id: string, updateSaccoDto: UpdateSaccoDto, user: OldJwtPayload) {
    if (user.role === 'Super User' || user.role === 'general admin') {
      return this.saccoModel.findByIdAndUpdate(id, {
        ...updateSaccoDto,
        updatedBy: user._id,
        updatedAt: new Date(),
      });
    }
    throw new HttpException(
      'You are not allowed to update a sacco',
      HttpStatus.FORBIDDEN,
    );
  }

  remove(id: string, user: OldJwtPayload) {
    return `This action removes a #${id} sacco`;
  }
}
