import { Module } from '@nestjs/common';
import { LipaNaMpesaService } from './lipa-na-mpesa.service';
import { LipaNaMpesaController } from './lipa-na-mpesa.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  LipaNaMpesaTransaction,
  LipaNaMpesaTransactionSchema,
} from './schema/lipa-na-mpesa.schema';
import { LipaNaMpesaGateway } from './lipa-na-mpesa.gateway';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [LipaNaMpesaController],
  imports: [
    MongooseModule.forFeature([
      {
        name: LipaNaMpesaTransaction.name,
        schema: LipaNaMpesaTransactionSchema,
      },
    ]),
    HttpModule,
  ],
  providers: [LipaNaMpesaService, LipaNaMpesaGateway],
})
export class LipaNaMpesaModule { }
