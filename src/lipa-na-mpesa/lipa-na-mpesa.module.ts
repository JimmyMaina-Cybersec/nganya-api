import { Module } from '@nestjs/common';
import { LipaNaMpesaService } from './lipa-na-mpesa.service';
import { LipaNaMpesaController } from './lipa-na-mpesa.controller';

@Module({
  controllers: [LipaNaMpesaController],
  providers: [LipaNaMpesaService]
})
export class LipaNaMpesaModule {}
