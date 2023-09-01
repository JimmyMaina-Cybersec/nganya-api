import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { JwtPayload, OldJwtPayload } from 'src/types/jwt-payload';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Route, RouteDocument } from './schema/route.schema';
import { DeleteResult } from 'mongodb';

@Injectable()
export class RoutesService {
  constructor(
    @InjectModel(Route.name)
    private readonly routeModel: Model<RouteDocument>,
  ) { }

  create(createRouteDto: CreateRouteDto, user: JwtPayload) {
    try {
      return this.routeModel.create({
        destinations: createRouteDto.destinations,
        sacco: user.user_metadata.sacco,
        station: user.user_metadata.station,
        addedBy: user.sub,
      });
    } catch (error) {
      console.log(error);

      throw new HttpException(
        error.message || 'Something went wrong',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll(query: any, user: OldJwtPayload) {
    try {
      if (user.role === 'admin' || user.role === 'general admin') {
        return this.routeModel.find({
          ...query,
          sacco: user.sacco,
        });
      }
      return this.routeModel.find({
        ...query,
        station: user.station,
      });
    } catch (error) {
      throw new HttpException(
        error.message || 'Something went wrong',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} route`;
  }

  update(id: string, updateRouteDto: UpdateRouteDto, user: OldJwtPayload) {
    try {
      if (
        user.role === 'Super User' ||
        user.role === 'station manager' ||
        user.role === 'admin' ||
        user.role === 'general admin'
      ) {
        return this.routeModel.updateOne(
          {
            _id: id,
          },
          {
            ...updateRouteDto,
            updatedBy: user._id,
            updatedAt: new Date(),
          },
          {
            new: true,
          },
        );
      }

      throw new HttpException(
        'You do not have permission to update routes',
        HttpStatus.FORBIDDEN,
      );
    } catch (error) {
      throw new HttpException(
        error.message || 'Something went wrong',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  remove(_id: string, user: OldJwtPayload): Promise<DeleteResult> {
    try {
      if (
        user.role === 'Super User' ||
        user.role === 'station manager' ||
        user.role === 'admin' ||
        user.role === 'general admin'
      ) {
        return this.routeModel.deleteOne({
          _id,
        });
      }

      throw new HttpException(
        'Only station managers can delete routes',
        HttpStatus.FORBIDDEN,
      );
    } catch (error) {
      throw new HttpException(
        error.message || 'Something went wrong',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
