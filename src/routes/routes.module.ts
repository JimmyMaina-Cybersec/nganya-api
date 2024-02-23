import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Route, RouteSchema } from './schema/route.schema';

@Module({
  controllers: [RoutesController],
  providers: [RoutesService],
  imports: [
    MongooseModule.forFeature([
      { name: Route.name, schema: RouteSchema },
    ]),
  ],
})
export class RoutesModule {}
