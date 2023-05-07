import { Module } from '@nestjs/common';
import { SaccosService } from './saccos.service';
import { SaccosController } from './saccos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Sacco,
  SaccoSchema,
} from './schema/sacco.schema';

@Module({
  controllers: [SaccosController],
  imports: [
    MongooseModule.forFeature([
      { name: Sacco.name, schema: SaccoSchema },
    ]),
  ],
  providers: [SaccosService],
})
export class SaccosModule {}
