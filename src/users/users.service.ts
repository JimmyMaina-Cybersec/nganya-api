import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtPayload } from 'src/types/jwt-payload';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async checkIfUserExists(idNo: string): Promise<boolean> {
    const exists = await this.userModel.exists({
      idNo: idNo,
    });
    if (exists) {
      return true;
    }
    return false;
  }

  /**
   * ### Add User
   *
   * @param createUserDto
   * @param user
   * @returns Object
   */
  async addUser(createUserDto: CreateUserDto, user: JwtPayload) {
    if (await this.checkIfUserExists(createUserDto.idNo)) {
      if (
        user.role === 'Super User' ||
        user.role === 'admin' ||
        user.role === 'general admin'
      ) {
        await this.userModel.create({
          ...createUserDto,
          status: 'active',
          sacco: user.sacco,
          createdBy: user._id,
          updatedBy: user._id,
        });
        throw new HttpException(
          'User created successfully',
          HttpStatus.CREATED,
        );
      } else if (user.role === 'station manager') {
        if (createUserDto.role === 'station agent') {
          await this.userModel.create({
            ...createUserDto,
            status: 'active',
            station: user.station,
            sacco: user.sacco,
            createdBy: user._id,
            updatedBy: user._id,
          });
          throw new HttpException(
            'User created successfully',
            HttpStatus.CREATED,
          );
        }
      } else {
        throw new HttpException(
          'You are not allowed to perform this action',
          HttpStatus.FORBIDDEN,
        );
      }
    } else {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
  }

  /**
   * ### Find All Users
   * @param currentUser
   * @returns Array<UserDocument>
   */
  async findAllUsers(currentUser: JwtPayload) {
    switch (currentUser.role) {
      case 'Super User':
        return await this.userModel
          .find({
            sacco: currentUser.sacco,
          })
          .select('-password -refreshToken');
      case 'general admin':
        return await this.userModel
          .find({
            sacco: currentUser.sacco,
          })
          .select('-password -refreshToken -upadatedAt -updatedBy');
      case 'admin':
        return await this.userModel
          .find({
            sacco: currentUser.sacco,
          })
          .select('-password -refreshToken -upadatedAt -updatedBy');
      case 'station manager':
        return await this.userModel.find({
          station: currentUser.station,
        });
      default:
        return await this.userModel
          .find({
            _id: currentUser._id,
          })
          .select('-password -refreshToken -upadatedAt -updatedBy');
    }
  }

  /**
   * ### Find a User
   * @param idNo
   * @param user
   * @returns Object<UserDocument>
   * */
  async findUser(idNo: string, user: JwtPayload) {
    switch (user.role) {
      case 'Super User':
        return this.userModel
          .findById(idNo)
          .select('-password -refreshToken -upadatedAt -updatedBy');

      case 'general admin':
        return this.userModel
          .findOne({
            sacco: user.sacco,
            _id: idNo,
          })
          .select('-password -refreshToken -upadatedAt -updatedBy');

      case 'admin':
        return this.userModel
          .findOne({
            sacco: user.sacco,
            _id: idNo,
          })
          .select('-password -refreshToken -upadatedAt -updatedBy');

      case 'station manager':
        return this.userModel
          .findOne({
            station: user.station,
            __id: idNo,
          })
          .select('-password -refreshToken -upadatedAt -updatedBy');

      default:
        throw new HttpException(
          'You are not allowed to perform this action',
          HttpStatus.FORBIDDEN,
        );
    }
  }

  /**
   * ### Find a User
   * @param idNo
   * @param user
   * @returns Object<UserDocument>
   * */
  async findUserById(idNo: { idNo: string }, user: JwtPayload) {
    switch (user.role) {
      case 'Super User':
        return this.userModel
          .findOne({
            idNo,
          })
          .select('-password -refreshToken -upadatedAt -updatedBy');

      case 'general admin':
        return this.userModel
          .findOne({
            sacco: user.sacco,
            idNo,
          })
          .select('-password -refreshToken -upadatedAt -updatedBy');

      case 'admin':
        return this.userModel
          .findOne({
            sacco: user.sacco,
            idNo,
          })
          .select('-password -refreshToken -upadatedAt -updatedBy');

      case 'station manager':
        return this.userModel
          .findOne({
            station: user.station,
            idNo,
          })
          .select('-password -refreshToken -upadatedAt -updatedBy');

      default:
        throw new HttpException(
          'You are not allowed to perform this action',
          HttpStatus.FORBIDDEN,
        );
    }
  }

  /**
   * ### Update a User
   *
   * @param id
   * @param updateUserDto
   * @param user
   * @returns Object<UserDocument>
   *
   * */

  async updateUser(id: string, updateUserDto: UpdateUserDto, user: JwtPayload) {
    if (
      user.role === 'Super User' ||
      user.role === 'admin' ||
      user.role === 'general admin'
    ) {
      const UpdatingUser = await this.userModel.findById(id);
      if (UpdatingUser.sacco === user.sacco) {
        return await this.userModel
          .findByIdAndUpdate(id, {
            ...updateUserDto,
            updatedAt: Date.now(),
            updatedBy: user._id,
          })
          .select('-password -refreshToken -upadatedAt -updatedBy');
      }
      throw new HttpException(
        'You are not allowed to perform this action',
        HttpStatus.FORBIDDEN,
      );
    } else if (user.role === 'station manager') {
      const UpdatingUser = await this.userModel.findById(id);
      if (
        UpdatingUser.station === user.station &&
        UpdatingUser.role === 'station agent'
      ) {
        return await this.userModel
          .findByIdAndUpdate(id, {
            ...updateUserDto,
            updatedAt: Date.now(),
            updatedBy: user._id,
          })
          .select('-password -refreshToken -upadatedAt -updatedBy');
      }
    } else {
      throw new HttpException(
        'You are not allowed to perform this action',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  /**
   * ### Delete a User
   *
   * @param id
   * @param user
   * @returns
   *
   */

  async deleteUser(id: string, user: JwtPayload) {
    const deletingUser = await this.userModel.findById(id);
    if (deletingUser.role === 'Super User') {
      throw new HttpException(
        'You are not allowed to perform this action',
        HttpStatus.FORBIDDEN,
      );
    }

    if (user.role === 'Super User') {
      await this.userModel.findByIdAndDelete(id);
      return 'User deleted successfully';
    }
    if (user.role === 'admin' || user.role === 'general admin') {
      if (
        deletingUser.sacco === user.sacco &&
        deletingUser.role !== 'general admin'
      ) {
        await this.userModel.findByIdAndDelete(id);
        return 'User deleted successfully';
      }
      throw new HttpException(
        'You are not allowed to perform this action',
        HttpStatus.FORBIDDEN,
      );
    }
    if (user.role === 'station manager') {
      if (
        deletingUser.station === user.station &&
        deletingUser.role === 'station agent'
      ) {
        await this.userModel.findByIdAndDelete(id);
        return 'User deleted successfully';
      }
      throw new HttpException(
        'You are not allowed to perform this action',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
