import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtPayload } from 'src/types/jwt-payload';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/schema/user.schema';
import { Sacco, SaccoDocument } from 'src/saccos/schema/sacco.schema';
import { Station, StationDocument } from 'src/stations/schema/station.schema';
import { Vehicle, VehicleDocument } from 'src/vehicles/schema/vehicle.schema';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Sacco.name)
    private saccoModel: Model<SaccoDocument>,
    @InjectModel(Station.name)
    private stationModel: Model<StationDocument>,
    @InjectModel(Vehicle.name)
    private vehicleModel: Model<VehicleDocument>

  ) { }

  async myProfile(user: JwtPayload) {
    try {
      const station = await this.stationModel.findById(user.user_metadata.station)
      const sacco = await this.saccoModel.findById(user.user_metadata.sacco)
      const vehicle = await this.vehicleModel.findById(user.user_metadata.vehicle)
      return {
        ...user,
        station: station ?? null,
        sacco: sacco,
        vehicle: vehicle ?? null
      }
    } catch (error) {
      throw new HttpException(error, error.status);
    }
  }

  async update(updateProfileDto: UpdateProfileDto, user: JwtPayload) {
    // try {
    //   await this.userModel.findByIdAndUpdate(user._id, { ...updateProfileDto });
    //   throw new HttpException('Profile updated successfully', HttpStatus.OK);
    // } catch (error) {
    //   throw new HttpException(error.message, error.status);
    // }
    throw new HttpException('Not implimentes', HttpStatus.BAD_REQUEST)
  }
}
