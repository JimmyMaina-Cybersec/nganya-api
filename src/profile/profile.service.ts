import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtPayload } from 'src/types/jwt-payload';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/schema/user.schema';
import { ObjectId } from 'mongodb';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async myProfile(_id: ObjectId) {
    try {
      return await this.userModel
        .findById(_id)
        .populate('sacco', '-__v')
        .select('-__v');
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }

  async update(updateProfileDto: UpdateProfileDto, user: JwtPayload) {
    try {
      await this.userModel.findByIdAndUpdate(user._id, { ...updateProfileDto });
      return new HttpException('Profile updated successfully', HttpStatus.OK);
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
