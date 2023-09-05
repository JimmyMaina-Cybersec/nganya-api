import { Module } from '@nestjs/common';
import { PercelService } from './percel.service';
import { PercelController } from './percel.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AvailabilitySchema } from 'src/availabilities/schema/availability.schema';
import { Availability } from 'src/schemas/Availability';
import {
  Station,
  StationSchema,
} from 'src/stations/schema/station.schema';
import { Parcel, ParcelSchema } from './schema/percel.schema';

@Module({
  controllers: [PercelController],
  providers: [PercelService],
  imports: [
    MongooseModule.forFeature([
      { name: Availability.name, schema: AvailabilitySchema },
      { name: Station.name, schema: StationSchema },
      { name: Parcel.name, schema: ParcelSchema },
    ]),
  ],
})
export class PercelModule { }
