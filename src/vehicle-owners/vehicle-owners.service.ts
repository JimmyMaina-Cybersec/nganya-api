import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateVehicleOwnerDto } from './dto/create-vehicle-owner.dto';
import { UpdateVehicleOwnerDto } from './dto/update-vehicle-owner.dto';
import { InjectModel } from '@nestjs/mongoose';
import { VehicleOwner } from './schema/vehicle-owner.schema';
import { Model } from 'mongoose';
import { JwtPayload } from 'src/types/jwt-payload';
import { Vehicle } from 'src/vehicles/schema/vehicle.schema';
import { VehicleOwnersQuery } from 'src/types/vehicleOwnersQuery';

@Injectable()
export class VehicleOwnersService {
  constructor(
    @InjectModel(VehicleOwner.name)
    private vehicleOwnerModel: Model<VehicleOwner>,
    @InjectModel(Vehicle.name)
    private vehicleModel: Model<Vehicle>,
  ) {}

  async addVehicleOwner(
    createVehicleOwnerDto: CreateVehicleOwnerDto,
    user: JwtPayload,
  ) {
    if (
      user.role === 'Super User' ||
      user.role === 'admin' ||
      user.role === 'general admin'
    ) {
      await this.vehicleOwnerModel.create({
        ...createVehicleOwnerDto,
        sacco: user.sacco,
        status: 'active',
        createdBy: user._id,
        updatedBy: user._id,
      });
      throw new HttpException(
        'Vehicle Owner created successfully',
        HttpStatus.CREATED,
      );
    }
    throw new HttpException(
      'You Do Not Have Permission Add Vehicle Owner',
      HttpStatus.FORBIDDEN,
    );
  }

  async findAll(user: JwtPayload, pagination) {
    try {
      const query: VehicleOwnersQuery = {};
      if (
        user.role === 'Super User' ||
        user.role === 'admin' ||
        user.role === 'general admin'
      ) {
        query.sacco = user.sacco;
      } else {
        throw new HttpException(
          'You Do Not Have Permission To View Vehicle Owners',
          HttpStatus.FORBIDDEN,
        );
      }
      const { page, resPerPage } = pagination;
      const [vehicleOwners, totalCount] = await Promise.all([
        this.vehicleOwnerModel
          .find(query)
          .select('-__v')
          .skip(pagination.skip)
          .limit(pagination.resPerPage),
        this.vehicleOwnerModel.countDocuments(query),
      ]);

      return {
        data: vehicleOwners,
        page,
        resPerPage,
        numberOfPages: Math.ceil(totalCount / resPerPage),
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  findOne(id: string, user: JwtPayload) {
    if (
      user.role === 'Super User' ||
      user.role === 'admin' ||
      user.role === 'general admin'
    ) {
      return this.vehicleOwnerModel.findOne({ _id: id });
    }
    throw new HttpException(
      'You Do Not Have Permission To View Vehicle Owner',
      HttpStatus.FORBIDDEN,
    );
  }
  update(
    id: string,
    updateVehicleOwnerDto: UpdateVehicleOwnerDto,
    user: JwtPayload,
  ) {
    if (
      user.role === 'Super User' ||
      user.role === 'admin' ||
      user.role === 'general admin'
    ) {
      return this.vehicleOwnerModel.updateOne(
        { _id: id },
        {
          ...updateVehicleOwnerDto,
          updatedBy: user._id,
          upadatedAt: new Date(),
        },
      );
    }
    throw new HttpException(
      'You Do Not Have Permission To Update Vehicle Owner',
      HttpStatus.FORBIDDEN,
    );
  }

  async deleteVehicleOwner(id: string, user: JwtPayload) {
    if (
      user.role === 'Super User' ||
      user.role === 'admin' ||
      user.role === 'general admin'
    ) {
      const vehicleOwner = await this.vehicleOwnerModel.exists({
        owner: id,
      });
      if (vehicleOwner) {
        throw new HttpException(
          'Vehicle Owner Has existing Vehicles',
          HttpStatus.FORBIDDEN,
        );
      }
      await this.vehicleOwnerModel.findByIdAndDelete(id);
      throw new HttpException(
        'Vehicle Owner Deleted Successfully',
        HttpStatus.OK,
      );
    }
    throw new HttpException(
      'You Do Not Have Permission To Delete Vehicle Owner',
      HttpStatus.FORBIDDEN,
    );
  }
}
