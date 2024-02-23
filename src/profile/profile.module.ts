import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  User,
  UserSchema,
} from 'src/users/schema/user.schema';
import { Sacco, SaccoSchema } from 'src/saccos/schema/sacco.schema';
import { Station, StationSchema } from 'src/stations/schema/station.schema';
import { Vehicle, VehicleSchema } from 'src/vehicles/schema/vehicle.schema';

@Module({
  controllers: [ProfileController],
  imports: [
    MongooseModule.forFeature([
      { name: Sacco.name, schema: SaccoSchema },
      { name: Station.name, schema: StationSchema },
      { name: Vehicle.name, schema: VehicleSchema }
    ]),
  ],
  providers: [ProfileService],
})
export class ProfileModule { }
