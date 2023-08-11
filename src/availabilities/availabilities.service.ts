import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';
import { OldJwtPayload } from 'src/types/jwt-payload';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Availability,
  AvailabilityDocument,
} from './schema/availability.schema';
import { Station, StationDocument } from 'src/stations/schema/station.schema';
import { Vehicle, VehicleDocument } from 'src/vehicles/schema/vehicle.schema';
import PaginationQueryType from 'src/types/paginationQuery';
import { AvailabilityQuery } from '../types/availabilitiesQuery';

@Injectable()
export class AvailabilitiesService {
  constructor(
    @InjectModel(Availability.name)
    private readonly availabilityModel: Model<AvailabilityDocument>,
    @InjectModel(Station.name)
    private readonly stationModel: Model<StationDocument>,
    @InjectModel(Vehicle.name)
    private readonly vehicleModel: Model<VehicleDocument>,
  ) { }

  async create(createAvailabilityDto: CreateAvailabilityDto, user: OldJwtPayload) {
    try {
      if (
        user.role === 'station manager' ||
        (user.role === 'station agent' && user.permission?.canAddAvailabilities)
      ) {
        return await this.availabilityModel.create({
          ...createAvailabilityDto,
          station: user.station,
          sacco: user.sacco,
          addedBy: user._id,
          addedOn: new Date(),
        });
      } else {
        throw new HttpException(
          'Only station managers and station agents with permission to add availabilities can add availabilities',
          HttpStatus.FORBIDDEN,
        );
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll(user: OldJwtPayload, pagination: PaginationQueryType) {
    try {
      if (!user || !user.role) {
        throw new UnauthorizedException(
          'You are not authorized to view Availabilities',
        );
      }
      const query: AvailabilityQuery = {};

      if (
        user.role === 'general admin' ||
        user.role === 'admin' ||
        user.role === 'Super User'
      ) {
        query.sacco = user.sacco;
      } else if (
        user.role === 'station manager' ||
        user.role === 'station agent'
      ) {
        query.station = user.station;
      } else {
        throw new HttpException(
          'You are not allowed to view availabilities',
          HttpStatus.FORBIDDEN,
        );
      }

      const { page, resPerPage } = pagination;

      const [availabilities, totalCount] = await Promise.all([
        this.availabilityModel
          .find(query)
          .populate('vehicle')
          .populate('route')
          .skip(pagination.skip)
          .limit(pagination.resPerPage),
        this.availabilityModel.countDocuments(query),
      ]);

      return {
        data: availabilities,
        page,
        resPerPage,
        totalPages: Math.ceil(totalCount / resPerPage),
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: string, user: OldJwtPayload) {
    return await this.availabilityModel.findById(id);
  }

  async update(
    id: string,
    updateAvailabilityDto: UpdateAvailabilityDto,
    user: OldJwtPayload,
  ) {
    try {
      if (
        user.role === 'admin' ||
        user.role === 'Super User' ||
        user.role === 'general admin' ||
        user.role === 'station manager' ||
        (user.role === 'station agent' &&
          user.permission?.canUpdateAvailabilities)
      ) {
        return await this.availabilityModel.findByIdAndUpdate(
          id,
          {
            ...updateAvailabilityDto,
            updatedBy: user._id,
            updatedOn: new Date(),
          },
          { new: true },
        );
      } else {
        throw new HttpException(
          'Only station managers and station agents with permission to update availabilities can update availabilities',
          HttpStatus.FORBIDDEN,
        );
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async deleteAvalablity(id: string, user: OldJwtPayload) {
    try {
      if (user.role === 'admin' || user.role === 'general admin') {
        await this.availabilityModel.findByIdAndDelete(id);
      } else if (
        user.role === 'station manager' ||
        (user.role === 'station agent' &&
          user.permission?.canDeleteAvailabilities)
      ) {
        await this.availabilityModel.deleteOne({
          _id: id,
          // station: user.station,
        });
        throw new HttpException(
          'Availability deleted successfully',
          HttpStatus.OK,
        );
      } else {
        throw new HttpException(
          'Only station managers and station agents with permission to delete availabilities can delete availabilities',
          HttpStatus.FORBIDDEN,
        );
      }

      throw new HttpException(
        'Availability deleted successfully',
        HttpStatus.OK,
      );
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
