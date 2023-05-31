import { Module } from '@nestjs/common';
import { LipaNaMpesaService } from './lipa-na-mpesa.service';
import { LipaNaMpesaController } from './lipa-na-mpesa.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  LipaNaMpesaTransaction,
  LipaNaMpesaTransactionSchema,
} from './schema/lipa-na-mpesa.schema';
import { LipaNaMpesaGateway } from './lipa-na-mpesa.gateway';

@Module({
  controllers: [LipaNaMpesaController],
  imports: [
    MongooseModule.forFeature([
      {
        name: LipaNaMpesaTransaction.name,
        schema: LipaNaMpesaTransactionSchema,
      },
    ]),
  ],
  providers: [LipaNaMpesaService, LipaNaMpesaGateway],
})
export class LipaNaMpesaModule {}
