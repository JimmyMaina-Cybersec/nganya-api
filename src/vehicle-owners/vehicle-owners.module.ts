import { Module } from '@nestjs/common';
import { VehicleOwnersService } from './vehicle-owners.service';
import { VehicleOwnersController } from './vehicle-owners.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  VehicleOwner,
  VehicleOwnerSchema,
} from './schema/vehicle-owner.schema';
import { Sacco, SaccoSchema } from 'src/saccos/schema/sacco.schema';

@Module({
  controllers: [VehicleOwnersController],
  imports: [
    MongooseModule.forFeature([
      {
        name: VehicleOwner.name,
        schema: VehicleOwnerSchema,
      },
      {
        name: Sacco.name,
        schema: SaccoSchema,
      },
    ]),
  ],
  providers: [VehicleOwnersService],
})
export class VehicleOwnersModule {}
