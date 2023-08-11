import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { OldJwtPayload } from 'src/types/jwt-payload';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vehicle, VehicleDocument } from './schema/vehicle.schema';
import { User, UserDocument } from 'src/users/schema/user.schema';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Pagination } from 'src/common/decorators/paginate.decorator';
import { VehicleQuery } from 'src/types/vehicleQuery';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectModel(Vehicle.name)
    private vehicleModel: Model<VehicleDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) { }

  async checkVehicleRegNo(regNo: string) {
    const exist = await this.vehicleModel.exists({ plateNo: regNo });
    if (exist) {
      return true;
    }
    return false;
  }

  async addVehicle(
    createVehicleDto: CreateVehicleDto,
    user: OldJwtPayload,
    vehicleOwner: string,
  ) {
    try {
      if (await this.checkVehicleRegNo(createVehicleDto.plateNo)) {
        throw new HttpException(
          'Vehicle with this registration number already exists',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (
        user.role === 'Super User' ||
        user.role === 'admin' ||
        user.role === 'general admin'
      ) {
        const vehicleExists = await this.vehicleModel.exists({
          plateNo: createVehicleDto.plateNo,
        });
        if (vehicleExists) {
          throw new HttpException(
            'Vehicle with this registration number already exists',
            HttpStatus.BAD_REQUEST,
          );
        }

        await this.vehicleModel.create({
          ...createVehicleDto,
          sacco: user.sacco,
          vehicleOwner: user._id,
          addedBy: user._id,
        });
        throw new HttpException(
          'Vehicle added successfully',
          HttpStatus.CREATED,
        );
      }
      throw new HttpException(
        'You dont have permision to creat vehicles',
        HttpStatus.FORBIDDEN,
      );
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll(user: OldJwtPayload, pagination) {
    try {
      const query: VehicleQuery = {};
      if (
        user.role === 'Super User' ||
        user.role === 'admin' ||
        user.role === 'general admin'
      ) {
        query.sacco = user.sacco;
      } else if (user.role === 'station agent' || 'station manager') {
        query.sacco = user.sacco;
        query.$or = [
          { lastStation: user.station },
          { currentStation: user.station },
          { nextStation: user.station },
        ];
      } else {
        return [];
      }

      const { page, resPerPage } = pagination;
      const [vehicles, totalCount] = await Promise.all([
        this.vehicleModel
          .find(query)
          .skip(pagination.skip)
          .limit(pagination.resPerPage),
        this.vehicleModel.countDocuments(query),
      ]);

      return {
        data: vehicles,
        page,
        resPerPage,
        numberOfPages: Math.ceil(totalCount / resPerPage),
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async getOwnerVehicles(user: OldJwtPayload, vehicleOwnerID, pagination) {
    try {
      const query: VehicleQuery = {};
      if (user.role === 'Super User') {
        query.owner = vehicleOwnerID;
      } else if (user.role === 'admin' || user.role === 'general admin') {
        query.owner = vehicleOwnerID;
        query.sacco = user.sacco;
      } else {
        throw new HttpException(
          'You are not allowed to see Details of the selected vehicle',
          HttpStatus.FORBIDDEN,
        );
      }

      const { page, resPerPage } = pagination;
      const [ownersVehicles, totalCount] = await Promise.all([
        this.vehicleModel
          .find(query)
          .skip(pagination.skip)
          .limit(pagination.resPerPage),
        this.vehicleModel.countDocuments(query),
      ]);

      return {
        data: ownersVehicles,
        page,
        resPerPage,
        numberOfPages: Math.ceil(totalCount / resPerPage),
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: string, user: OldJwtPayload) {
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
    throw new HttpException(
      'You are not allowed to see Details of the selected vehicle',
      HttpStatus.FORBIDDEN,
    );
  }

  async addToStation(user: OldJwtPayload, query: { plateNo: string }) {
    try {
      if (
        user.role === 'station manager' ||
        user.role === 'admin' ||
        user.role === 'general admin'
      ) {
        console.log(user.sacco);

        const exists = await this.vehicleModel.exists({
          plateNo: query.plateNo.toLowerCase(),
          sacco: user.sacco,
        });

        if (!exists) {
          throw new HttpException(
            'Vehicle with this registration number does not exist in your sacco',
            HttpStatus.NOT_FOUND,
          );
        }

        const result = await this.vehicleModel.findOneAndUpdate(
          {
            plateNo: query.plateNo.toLowerCase(),
          },
          {
            currentStation: user.station,
            status: 'in station',
          },
          {
            new: true,
          },
        );

        if (!result) {
          throw new HttpException(
            'Vehicle with this registration number does not exist in your sacco',
            HttpStatus.NOT_FOUND,
          );
        }
        return result;
      } else {
        throw new HttpException(
          'You are not allowed to add vehicles to station',
          HttpStatus.FORBIDDEN,
        );
      }
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async hasDriver(user: OldJwtPayload, vehicleID: string) {
    try {
      const exists = await this.userModel.exists({
        vehicle: vehicleID,
      });

      if (exists) {
        return true;
      }
      return false;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async assignDriver(user: OldJwtPayload, updateDriverDto: UpdateDriverDto) {
    if (await this.hasDriver(user, updateDriverDto.vehicleID)) {
      throw new HttpException(
        'You are already assigned to this vehicle',
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const isDriver = await this.userModel.exists({
        _id: updateDriverDto.driverID,
        role: 'driver',
      });
      if (!isDriver) {
        throw new HttpException(
          'The selected user is not a driver',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (
        (user.role === 'admin' || user.role === 'general admin',
          user.role === 'Super User')
      ) {
        await this.userModel.findOneAndUpdate(
          {
            _id: updateDriverDto.driverID,
            sacco: user.sacco,
          },
          {
            vehicle: updateDriverDto.vehicleID,
          },
        );
        throw new HttpException('Driver assigned successfully', HttpStatus.OK);
      } else {
        throw new HttpException(
          'You are not allowed to assign a driver to this vehicle',
          HttpStatus.FORBIDDEN,
        );
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async getDriver(user: OldJwtPayload, vehicleID: string) {
    try {
      if (user.role === 'Super User') {
        return await this.userModel

          .findOne({
            vehicle: vehicleID,
          })
          .select('firstName secondName photoURL phone')
          .exec();
      } else {
        return await this.userModel
          .findOne({
            vehicle: vehicleID,
            sacco: user.sacco,
          })
          .select('firstName secondName photoURL phone')
          .exec();
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  updateVehicle(
    id: string,
    updateVehicleDto: UpdateVehicleDto,
    user: OldJwtPayload,
  ) {
    return `This action updates a #${id} vehicle`;
  }

  async deleteVehicle(id: string, user: OldJwtPayload) {
    try {
      if (user.role === 'Super User') {
        await this.vehicleModel.findByIdAndDelete(id);
      } else if (user.role === 'admin' || user.role === 'general admin') {
        await this.vehicleModel.findOneAndDelete({
          _id: id,
          sacco: user.sacco,
        });
      } else {
        throw new HttpException(
          'You are not allowed to delete this vehicle',
          HttpStatus.FORBIDDEN,
        );
      }
      throw new HttpException('Vehicle deleted successfully', HttpStatus.OK);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
