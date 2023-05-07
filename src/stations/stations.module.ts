import { Module } from '@nestjs/common';
import { StationsService } from './stations.service';
import { StationsController } from './stations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Station,
  StationSchema,
} from './schema/station.schema';

@Module({
  controllers: [StationsController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Station.name,
        schema: StationSchema,
      },
    ]),
  ],
  providers: [StationsService],
})
export class StationsModule {}
