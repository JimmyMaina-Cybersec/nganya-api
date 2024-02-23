import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { JwtPayload, OldJwtPayload } from 'src/types/jwt-payload';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Route, RouteDocument } from './schema/route.schema';
import { DeleteResult } from 'mongodb';
import CreatePriceDto from './dto/create-price.dto';

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
        error.message ?? 'Something went wrong',
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }


  findStationRoutes(user: JwtPayload) {
    try {



      return this.routeModel.find({
        station: user.user_metadata.station,
      });
    } catch (error) {
      console.log(error);

      throw new HttpException(
        error.message ?? 'Something went wrong',
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll(query: any, user: JwtPayload) {
    try {

      return this.routeModel.find({
        ...query,
        sacco: user.user_metadata.sacco,
      });

    } catch (error) {
      throw new HttpException(
        error.message ?? 'Something went wrong',
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findOne(id: string) {
    return this.routeModel.findById(id);
  }

  updatePrice(id: string, createPriceDto: CreatePriceDto, user: JwtPayload) {
    try {

      if (createPriceDto.mode == "fare") {
        return this.routeModel.updateOne(
          {
            _id: id,
          },
          {
            farePrices: createPriceDto.prices,
          },
          {
            new: true,
          },
        );
      }

      else {
        return this.routeModel.updateOne(
          {
            _id: id,
          },
          {
            parcelPrices: createPriceDto.prices,
          },
          {
            new: true,
          },
        );
      }

    } catch (error) {
      throw new HttpException(
        error.message ?? 'Something went wrong',
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  remove(_id: string, user: JwtPayload): Promise<DeleteResult> {
    try {

      return this.routeModel.deleteOne({
        _id,
      });

    } catch (error) {
      throw new HttpException(
        error.message ?? 'Something went wrong',
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
