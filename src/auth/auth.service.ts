import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schema/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import { JwtPayload } from 'src/types/jwt-payload';

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
      throw new ForbiddenException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(createAuthDto.password, user.password);

    if (!isMatch) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    await user.updateOne({ lastLogin: new Date() }).exec();

    return this.signToken(user);
  }

  async signToken(user: UserDocument) {
    const payload: JwtPayload = {
      _id: user._id,
      sub: user._id,
      firstName: user.firstName,
      secondName: user.secondName,
      idNo: user.idNo,
      phone: user.phone,
      email: user.email,
      photoURL: user.photoURL,
      role: user.role,
      sacco: user.sacco,
      station: user.station,
      permission: user.permission,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('ACCESS_TOKEN_SECRET'),
        expiresIn: this.configService.get('JWT_EXPIRATION_TIME'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('REFRESH_TOKEN_SECRET'),
        expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRATION_TIME'),
      }),
    ]);

    const hashedRefreshToken = await argon2.hash(refreshToken);

    await user.updateOne({ refreshToken: hashedRefreshToken }).exec();
    HttpStatus.OK;
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
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return this.signToken(user);
  }

  async signOut(id: string) {
    this.userModel.findByIdAndUpdate(id, {
      refreshToken: null,
    });
  }
}
