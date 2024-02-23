import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { Sacco, SaccoSchema } from 'src/saccos/schema/sacco.schema';
import { Vehicle, VehicleSchema } from 'src/vehicles/schema/vehicle.schema';

@Module({
  controllers: [UsersController],
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Sacco.name, schema: SaccoSchema },
      { name: Vehicle.name, schema: VehicleSchema },

      { name: Vehicle.name, schema: VehicleSchema }
    ]),
  ],
  providers: [UsersService],
})
export class UsersModule { }
