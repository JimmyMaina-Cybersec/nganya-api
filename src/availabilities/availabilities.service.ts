import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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
import PaginationQueryType from 'src/types/paginationQuery';
import { AvailabilityQuery } from '../types/availabilitiesQuery';
import { UserRoles } from 'src/types/UserRoles';
import { Permission } from 'src/types/permission';
import { UserPermissions } from 'src/types/PermissionType';

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

  async findAll(user: JwtPayload, fliters: {
    status?: string,
  },) {
    try {
      const [availabilities] = await Promise.all([
        this.availabilityModel
          .find({ station: user.user_metadata.station, status: fliters.status ?? 'Available' })
          .populate('vehicle')
          .populate('route'),
      ]);

      return availabilities
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findVehicleAvailabilities(user: JwtPayload, fliters: {
    status?: string,
    station?: string,
  }, vehicle: string) {
    try {
      const [availabilities] = await Promise.all([
        this.availabilityModel
          .find({ vehicle: vehicle, status: fliters.status ?? 'Available', station: fliters.station })
          .populate('vehicle')
          .populate('route'),
      ]);

      return availabilities
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
      if (user.user_roles.includes(UserRoles.SACCO_ADMIN) ||
        user.user_roles.includes(UserRoles.GENERAL_ADMIN)) {
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
