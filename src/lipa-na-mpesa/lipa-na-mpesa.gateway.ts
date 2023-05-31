import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { LipaNaMpesaService } from './lipa-na-mpesa.service';
import { Server } from 'socket.io';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  LipaNaMpesaTransaction,
  LipaNaMpesaTransactionDocument,
} from './schema/lipa-na-mpesa.schema';
import { OnEvent } from '@nestjs/event-emitter';

@WebSocketGateway({ namespace: 'mpesa' })
export class LipaNaMpesaGateway {
  constructor(
    private readonly lipaNaMpesaService: LipaNaMpesaService,
    @InjectModel(LipaNaMpesaTransaction.name)
    private readonly lipaNaMpesaTransaction: Model<LipaNaMpesaTransactionDocument>,
  ) {}

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('Namespace: ' + socket.nsp.name);
      console.log('Socket ID: ' + socket.id);
    });
  }

  @SubscribeMessage('lipaNaMpesa')
  async handleMessage(
    @MessageBody() mpesaData: { CheckoutRequestID: string; data: any },
  ) {
    this.server
      .to(mpesaData.CheckoutRequestID)
      .emit('onLipaNaMpesaTransaction', {
        status: `Loading ${mpesaData.CheckoutRequestID}...`,
      });

    return 'Loading...';
  }

  @OnEvent('mpesapayment.created')
  async handleMpesaPaymentCreatedEvent(mpesaData: {
    CheckoutRequestID: string;
    data: any;
  }) {
    this.server
      .to(mpesaData.CheckoutRequestID)
      .emit('onLipaNaMpesaTransaction', mpesaData.data);
  }
}
