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
import { ProfileModule } from './profile/profile.module';
import { BookingModule } from './booking/booking.module';
import { TicketModule } from './tickets/tickets.module';
import { LipaNaMpesaModule } from './lipa-na-mpesa/lipa-na-mpesa.module';
import { PercelModule } from './percel/percel.module';
import { RoutesModule } from './routes/routes.module';
import { ChatModule } from './chat/chat.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PresenceModule } from './presence/presence.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { SmsModule } from './sms/sms.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    EventEmitterModule.forRoot({
      wildcard: true,
      delimiter: '.',
      verboseMemoryLeak: false,
      ignoreErrors: false,
    }),
    StationsModule,
    UsersModule,
    VehiclesModule,
    SaccosModule,
    VehicleOwnersModule,
    AvailabilitiesModule,
    AuthModule,
    ProfileModule,
    BookingModule,
    TicketModule,
    LipaNaMpesaModule,
    PercelModule,
    RoutesModule,
    ChatModule,
    NotificationsModule,
    PresenceModule,
    SmsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
