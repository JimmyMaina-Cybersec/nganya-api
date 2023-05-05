import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  User,
  UserDocument,
} from 'src/users/schema/user.schema';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { access } from 'fs';
import { sign } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signIn(createAuthDto: CreateAuthDto) {
    const user = await this.userModel.findOne({
      idNo: createAuthDto.idNo,
    });

    if (!user) {
      throw new HttpException(
        'Invalid credentials',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isMatch = await compare(
      createAuthDto.password,
      user.password,
    );

    if (!isMatch) {
      throw new HttpException(
        'Invalid credentials',
        HttpStatus.UNAUTHORIZED,
      );
    }

    await user.updateOne({ lastLogin: new Date() }).exec();

    return this.signToken(user);
  }

  async signToken(user: UserDocument) {
    const payload = {
      _id: user._id,
      sub: user._id,
      firstName: user.firstName,
      secondName: user.secondName,
      idNo: user.idNo,
      phone: user.phone,
      email: user.email,
      photoURL: user.photoURL,
      role: user.role,
      permission: user.permission,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get(
          'ACCESS_TOKEN_SECRET',
        ),
        expiresIn: this.configService.get(
          'JWT_EXPIRATION_TIME',
        ),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get(
          'REFRESH_TOKEN_SECRET',
        ),
        expiresIn: this.configService.get(
          'REFRESH_TOKEN_EXPIRATION_TIME',
        ),
      }),
    ]);

    await user
      .updateOne({ refreshToken: refreshToken })
      .exec();

    return {
      access_token: accessToken,

      refresh_token: refreshToken,
    };
  }

  async refresh(refreshToken: string) {
    const user = await this.userModel.findOne({
      refreshToken: refreshToken,
    });
    if (!user) {
      throw new HttpException(
        'Invalid token',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return this.signToken(user);
  }

  signOut() {}
}
