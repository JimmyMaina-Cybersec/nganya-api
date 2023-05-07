import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Sacco, SaccoSchema } from 'src/saccos/schema/sacco.schema';
import { Station, StationSchema } from 'src/stations/schema/station.schema';
import { User, UserSchema } from 'src/users/schema/user.schema';
import {
  VehicleOwner,
  VehicleOwnerSchema,
} from 'src/vehicle-owners/schema/vehicle-owner.schema';
import { Vehicle, VehicleSchema } from './schema/vehicle.schema';

@Module({
  controllers: [VehiclesController],
  imports: [
    MongooseModule.forFeature([
      { name: Vehicle.name, schema: VehicleSchema },
      { name: VehicleOwner.name, schema: VehicleOwnerSchema },
      { name: Sacco.name, schema: SaccoSchema },
      { name: Station.name, schema: StationSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [VehiclesService],
})
export class VehiclesModule {}
