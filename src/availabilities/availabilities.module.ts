import { Module } from '@nestjs/common';
import { AvailabilitiesService } from './availabilities.service';
import { AvailabilitiesController } from './availabilities.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Availability, AvailabilitySchema } from './schema/availability.schema';
import { Station, StationSchema } from 'src/stations/schema/station.schema';
import { Vehicle, VehicleSchema } from 'src/vehicles/schema/vehicle.schema';

@Module({
  controllers: [AvailabilitiesController],
  imports: [
    MongooseModule.forFeature([
      { name: Availability.name, schema: AvailabilitySchema },
      { name: Station.name, schema: StationSchema },
      { name: Vehicle.name, schema: VehicleSchema },
    ]),
  ],
  providers: [AvailabilitiesService],
})
export class AvailabilitiesModule {}
