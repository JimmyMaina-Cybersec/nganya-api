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
import { UserRoles } from '../types/UserRoles';

@Injectable()
export class AvailabilitiesService {
  constructor(
    @InjectModel(Availability.name)
    private readonly availabilityModel: Model<AvailabilityDocument>,
  ) {}

  async create(createAvailabilityDto: CreateAvailabilityDto, user: JwtPayload) {
    try {
      return await this.availabilityModel.create({
        ...createAvailabilityDto,
        station: user.user_metadata.station,
        sacco: user.user_metadata.sacco,
        addedBy: user.sub,
        // addingUserNames: user.user_metadata.given_name + ' ' + user.user_metadata.family_name,
        addedOn: new Date(),
        status: 'Available',
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll(
    user: JwtPayload,
    filters: {
      status?: string;
    },
  ) {
    try {
      const [availabilities] = await Promise.all([
        this.availabilityModel
          .find({
            station: user.user_metadata.station,
            status: filters.status ?? 'Available',
          })
          .populate('vehicle')
          .populate('route'),
      ]);

      return availabilities;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findVehicleAvailabilities(
    user: JwtPayload,
    fliters: {
      status?: string;
      station?: string;
    },
    vehicle: string,
  ) {
    try {
      const availabilities = await this.availabilityModel
        .find({
          vehicle: vehicle,
          status: fliters.status ?? 'Available',
          station: user.user_metadata.station,
        })
        .populate('vehicle')
        .populate('route');

      return availabilities;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: string, user: JwtPayload) {
    const availability = await this.availabilityModel
      .findById(id)
      .populate('vehicle')
      .populate('route');
    if (!availability) {
      throw new HttpException('Availability not found', HttpStatus.NOT_FOUND);
    }
    return availability;
  }

  async update(
    id: string,
    updateAvailabilityDto: UpdateAvailabilityDto,
    user: JwtPayload,
  ) {
    try {
      return await this.availabilityModel.findByIdAndUpdate(
        id,
        {
          ...updateAvailabilityDto,
          updatedBy: user.sub,
          updatedOn: new Date(),
        },
        { new: true },
      );
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async deleteAvalablity(id: string, user: JwtPayload) {
    try {
      if (
        user.user_roles.includes(UserRoles.SACCO_ADMIN) ||
        user.user_roles.includes(UserRoles.GENERAL_ADMIN)
      ) {
        await this.availabilityModel.findByIdAndDelete(id);
      }
      if (
        user.user_roles.includes(UserRoles.SERVICE_AGENT) ||
        user.user_roles.includes(UserRoles.STATION_MANAGER)
      ) {
        await this.availabilityModel.deleteOne({
          _id: id,
          // station: user.station,
        });
        throw new HttpException(
          'Availability deleted successfully',
          HttpStatus.OK,
        );
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
