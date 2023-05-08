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
          station: user.station,
          sacco: user.sacco,
          addedBy: user._id,
          addedOn: new Date(),
        });
      } else {
        return new HttpException(
          'Only station managers and station agents with permission to add availabilities can add availabilities',
          HttpStatus.FORBIDDEN,
        );
      }

      return new HttpException(
        'Availability added successfully',
        HttpStatus.CREATED,
      );
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(user: JwtPayload) {
    let availabilities = [];
    try {
      if (user.role === 'Super User') {
        availabilities = await this.availabilityModel
          .find()
          .populate('station')
          .populate('vehicle');
      } else if (user.role === 'general admin' || user.role === 'admin') {
        availabilities = await this.availabilityModel
          .where({ sacco: user.sacco })
          .populate('station')
          .populate('vehicle');
      } else if (
        user.role === 'station manager' ||
        user.role === 'station agent'
      ) {
        availabilities = await this.availabilityModel
          .where({ sacco: user.sacco })
          .populate('station')
          .populate('vehicle');
      } else {
        return new HttpException(
          'You are not authorized to view availabilities',
          HttpStatus.FORBIDDEN,
        );
      }

      return availabilities;
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  findOne(id: string, user: JwtPayload) {
    return `This action returns a #${id} availability`;
  }

  update(
    id: string,
    updateAvailabilityDto: UpdateAvailabilityDto,
    user: JwtPayload,
  ) {
    return `This action updates a #${id} availability`;
  }

  remove(id: string, user: JwtPayload) {
    return `This action removes a #${id} availability`;
  }
}
