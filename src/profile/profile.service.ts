import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtPayload } from 'src/types/jwt-payload';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/schema/user.schema';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async myProfile(user: JwtPayload) {
    try {
      // if (user.station) {
      //   return await this.userModel
      //     .findById(user._id)
      //     .populate('sacco', '-__v')
      //     .populate('station', '-__v')
      //     .select('-__v');
      // }
      // if (user.vehicle) {
      //   return await this.userModel
      //     .findById(user._id)
      //     .populate('sacco', '-__v')
      //     .populate('vehicle', '-__v')
      //     .select('-__v');
      // }
      // return await this.userModel
      //   .findById(user._id)
      //   .populate('sacco', '-__v')
      //   .select('-__v');
      return user;
    } catch (error) {
      throw new HttpException(error, error.status);
    }
  }

  async update(updateProfileDto: UpdateProfileDto, user: JwtPayload) {
    try {
      await this.userModel.findByIdAndUpdate(user._id, { ...updateProfileDto });
      throw new HttpException('Profile updated successfully', HttpStatus.OK);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
