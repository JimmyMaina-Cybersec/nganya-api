import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';
import { JwtPayload } from 'src/types/jwt-payload';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Availability,
  AvailabilityDocument,
} from './schema/availability.schema';
import { Station, StationDocument } from 'src/stations/schema/station.schema';
import { Vehicle, VehicleDocument } from 'src/vehicles/schema/vehicle.schema';

@Injectable()
export class AvailabilitiesService {
  constructor(
    @InjectModel(Availability.name)
    private readonly availabilityModel: Model<AvailabilityDocument>,
    @InjectModel(Station.name)
    private readonly stationModel: Model<StationDocument>,
    @InjectModel(Vehicle.name)
    private readonly vehicleModel: Model<VehicleDocument>,
  ) {}

  async create(createAvailabilityDto: CreateAvailabilityDto, user: JwtPayload) {
    try {
      if (
        user.role === 'station manager' ||
        (user.role === 'station agent' && user.permission?.canAddAvailabilities)
      ) {
        await this.availabilityModel.create({
          ...createAvailabilityDto,
          depatureStation: user.station,
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

      throw new HttpException(
        'Availability added successfully',
        HttpStatus.CREATED,
      );
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll(user: JwtPayload) {
    let availabilities = [];
    try {
      if (
        user.role === 'general admin' ||
        user.role === 'admin' ||
        user.role === 'Super User'
      ) {
        availabilities = await this.availabilityModel
          .where({
            sacco: user.sacco,
          })
          .populate('vehicle')
          .populate('route');
      } else if (
        user.role === 'station manager' ||
        user.role === 'station agent'
      ) {
        availabilities = await this.availabilityModel
          .where({
            station: user.station,
          })
          .populate('vehicle')
          .populate('route');
      } else {
        throw new HttpException(
          'You are not authorized to view availabilities',
          HttpStatus.FORBIDDEN,
        );
      }

      return availabilities;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: string, user: JwtPayload) {
    return await this.availabilityModel.findById(id);
  }

  async update(
    id: string,
    updateAvailabilityDto: UpdateAvailabilityDto,
    user: JwtPayload,
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

  async deleteAvalablity(id: string, user: JwtPayload) {
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
