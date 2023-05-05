import { Module } from '@nestjs/common';
import { SaccosService } from './saccos.service';
import { SaccosController } from './saccos.controller';

@Module({
  controllers: [SaccosController],
  providers: [SaccosService]
})
export class SaccosModule {}
