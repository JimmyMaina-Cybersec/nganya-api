import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
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
        user.role === 'station manager' ||
        user.role === 'admin' ||
        user.role === 'general admin'
      ) {
        return this.routeModel.create({
          ...createRouteDto,
          sacco: user.sacco,
          station: user.station,
          addedBy: user._id,
          addedOn: new Date(),
        });
      }

      throw new HttpException(
        'Only station managers and station agents with permission to add availabilities can add availabilities',
        HttpStatus.FORBIDDEN,
      );
    } catch (error) {
      throw new HttpException(
        error.message || 'Something went wrong',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return 'This action adds a new route';
  }

  findAll(query: any, user: JwtPayload) {
    try {
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

  update(id: number, updateRouteDto: UpdateRouteDto) {
    return `This action updates a #${id} route`;
  }

  remove(id: number) {
    return `This action removes a #${id} route`;
  }
}
