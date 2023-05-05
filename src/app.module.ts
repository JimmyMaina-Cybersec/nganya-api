import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { StationsModule } from './stations/stations.module';
import { UsersModule } from './users/users.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { SaccosModule } from './saccos/saccos.module';
import { VehicleOwnersModule } from './vehicle-owners/vehicle-owners.module';
import { AvailabilitiesModule } from './availabilities/availabilities.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    StationsModule,
    UsersModule,
    VehiclesModule,
    SaccosModule,
    VehicleOwnersModule,
    AvailabilitiesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
