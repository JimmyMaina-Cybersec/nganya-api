import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { JwtPayload } from 'src/types/jwt-payload';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Route, RouteDocument } from './schema/route.schema';

@Injectable()
export class RoutesService {
  constructor(
    @InjectModel(Route.name)
    private readonly routeModel: Model<RouteDocument>,
  ) {}

  create(createRouteDto: CreateRouteDto, user: JwtPayload) {
    try {
      if (
        user.role === 'Super User' ||
        user.role === 'station manager' ||
        user.role === 'admin' ||
        user.role === 'general admin'
      ) {
        return this.routeModel.create({
          ...createRouteDto,
          sacco: user.sacco,
          station: user.station,
          addedBy: user._id,
        });
      }

      throw new HttpException(
        'Only station managers and station agents with permission to add availabilities can add availabilities',
        HttpStatus.FORBIDDEN,
      );
    } catch (error) {
      console.log(error);

      throw new HttpException(
        error.message || 'Something went wrong',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll(query: any, user: JwtPayload) {
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

  update(id: string, updateRouteDto: UpdateRouteDto, user: JwtPayload) {
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

  remove(_id: string, user: JwtPayload) {
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
