import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot("mongodb+srv://wekesa350:wekesa350@nganya.nibrk1c.mongodb.net/nganya"),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
