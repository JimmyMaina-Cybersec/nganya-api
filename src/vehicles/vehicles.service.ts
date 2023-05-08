import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { JwtPayload } from 'src/types/jwt-payload';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vehicle, VehicleDocument } from './schema/vehicle.schema';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectModel(Vehicle.name) private vehicleModel: Model<VehicleDocument>,
  ) {}

  async checkVehicleRegNo(regNo: string) {
    const exist = await this.vehicleModel.exists({ plateNo: regNo });
    if (exist) {
      return true;
    }
    return false;
  }

  async addVehicle(
    createVehicleDto: CreateVehicleDto,
    user: JwtPayload,
    vehicleOwner: string,
  ) {
    if (await this.checkVehicleRegNo(createVehicleDto.plateNo)) {
      return new HttpException(
        'Vehicle with this registration number already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      user.role === 'Super User' ||
      user.role === 'admin' ||
      user.role === 'general admin'
    ) {
      await this.vehicleModel.create({
        ...createVehicleDto,
        vehicleOwner: user._id,
      });
      return new HttpException(
        'Vehicle added successfully',
        HttpStatus.CREATED,
      );
    }
  }

  async findAll(user: JwtPayload) {
    if (
      user.role === 'Super User' ||
      user.role === 'admin' ||
      user.role === 'general admin'
    ) {
      return await this.vehicleModel
        .find({
          sacco: user.sacco,
        })
        .exec();
    } else if (user.role === 'station agent' || 'station manager') {
      return await this.vehicleModel
        .find({
          sacco: user.sacco,
        })
        .or([
          { lastStation: user.station },
          { currentStation: user.station },
          { nextStation: user.station },
        ])
        .exec();
    } else {
      return [];
    }
  }

  async findOne(id: string, user: JwtPayload) {
    if (user.role === 'Super User') {
      return this.vehicleModel.findById(id);
    }
    if (user.role === 'admin' || user.role === 'general admin') {
      return await this.vehicleModel.findOne({
        _id: id,
        sacco: user.sacco,
      });
    }
    if (user.role === 'station agent' || user.role === 'station manager') {
      return await this.vehicleModel
        .findOne({
          _id: id,
          sacco: user.sacco,
        })
        .select('-owner');
    }
    return new HttpException(
      'You are not allowed to see Details of the selected vehicle',
      HttpStatus.FORBIDDEN,
    );
  }

  updateVehicle(
    id: string,
    updateVehicleDto: UpdateVehicleDto,
    user: JwtPayload,
  ) {
    return `This action updates a #${id} vehicle`;
  }

  async deleteVehicle(id: string, user: JwtPayload) {
    try {
      if (user.role === 'Super User') {
        await this.vehicleModel.findByIdAndDelete(id);
      } else if (user.role === 'admin' || user.role === 'general admin') {
        await this.vehicleModel.findOneAndDelete({
          _id: id,
          sacco: user.sacco,
        });
      } else {
        return new HttpException(
          'You are not allowed to delete this vehicle',
          HttpStatus.FORBIDDEN,
        );
      }
      return new HttpException('Vehicle deleted successfully', HttpStatus.OK);
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
