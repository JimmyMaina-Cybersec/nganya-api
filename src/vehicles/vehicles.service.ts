import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { JwtPayload } from 'src/types/jwt-payload';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vehicle, VehicleDocument } from './schema/vehicle.schema';
import { User, UserDocument } from 'src/users/schema/user.schema';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { VehicleQuery } from 'src/types/vehicleQuery';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectModel(Vehicle.name)
    private vehicleModel: Model<VehicleDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
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
    try {
      if (await this.checkVehicleRegNo(createVehicleDto.plateNo)) {
        throw new HttpException(
          'Vehicle with this registration number already exists',
          HttpStatus.BAD_REQUEST,
        );
      }

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
        sacco: user.user_metadata.sacco,
        vehicleOwner: user.sub,
        addedBy: user.sub,
      });
      throw new HttpException('Vehicle added successfully', HttpStatus.CREATED);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll(user: JwtPayload, pagination) {
    try {
      const query: VehicleQuery = {};

      query.sacco = user.user_metadata.sacco;
      // query.$or = [
      //   { lastStation: user.user_metadata.station },
      //   { currentStation: user.user_metadata.station },
      //   { nextStation: user.user_metadata.station },
      // ];

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

  async getOwnerVehicles(user: JwtPayload, vehicleOwnerID, pagination) {
    try {
      const query: VehicleQuery = {};

      query.owner = vehicleOwnerID;
      // query.sacco = user.sacco;

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

  async findOne(id: string, user: JwtPayload) {
    // return this.vehicleModel.findById(id);

    return await this.vehicleModel.findOne({
      _id: id,
      sacco: user.user_metadata.sacco,
    });

    // return await this.vehicleModel
    //   .findOne({
    //     _id: id,
    //     sacco: user.user_metadata.sacco,
    //   })
    //   .select('-owner');
  }

  async addToStation(user: JwtPayload, query: { plateNo: string }) {
    try {
      console.log(user.user_metadata.sacco);

      const exists = await this.vehicleModel.exists({
        plateNo: query.plateNo.toLowerCase(),
        sacco: user.user_metadata.sacco,
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
          currentStation: user.user_metadata.station,
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
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async hasDriver(user: JwtPayload, vehicleID: string) {
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

  async assignDriver(user: JwtPayload, updateDriverDto: UpdateDriverDto) {
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

      await this.userModel.findOneAndUpdate(
        {
          _id: updateDriverDto.driverID,
          sacco: user.user_metadata.sacco,
        },
        {
          vehicle: updateDriverDto.vehicleID,
        },
      );
      throw new HttpException('Driver assigned successfully', HttpStatus.OK);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async getDriver(user: JwtPayload, vehicleID: string) {
    try {
      return await this.userModel

        .findOne({
          vehicle: vehicleID,
        })
        .select('firstName secondName photoURL phone')
        .exec();

      // return await this.userModel
      //   .findOne({
      //     vehicle: vehicleID,
      //     sacco: user.sacco,
      //   })
      //   .select('firstName secondName photoURL phone')
      //   .exec();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
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
      // await this.vehicleModel.findByIdAndDelete(id);

      await this.vehicleModel.findOneAndDelete({
        _id: id,
        sacco: user.user_metadata.sacco,
      });

      throw new HttpException('Vehicle deleted successfully', HttpStatus.OK);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
