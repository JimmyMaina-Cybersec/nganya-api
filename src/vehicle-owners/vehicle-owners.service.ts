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
  ) { }

  async addVehicleOwner(
    createVehicleOwnerDto: CreateVehicleOwnerDto,
    user: JwtPayload,
  ) {
    try {

      return await this.vehicleOwnerModel.create({
        ...createVehicleOwnerDto,
        sacco: user.user_metadata.sacco,
        status: 'active',
        createdBy: user.sub,
        updatedBy: user.sub,
      });
    } catch (error) {
      throw new HttpException(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

  }

  async findAll(user: JwtPayload, pagination) {
    try {
      const query: VehicleOwnersQuery = {};

      query.sacco = user.user_metadata.sacco;

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
    return this.vehicleOwnerModel.findOne({ _id: id });
  }
  update(
    id: string,
    updateVehicleOwnerDto: UpdateVehicleOwnerDto,
    user: JwtPayload,
  ) {
    return this.vehicleOwnerModel.updateOne(
      { _id: id },
      {
        ...updateVehicleOwnerDto,
        updatedBy: user.sub,
        upadatedAt: new Date(),
      },
    );
  }

  async deleteVehicleOwner(id: string, user: JwtPayload) {
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
}
