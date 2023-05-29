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
    this.server.emit('onLipaNaMpesaTransaction', {
      status: 'connection established',
    });
    const updates = await this.lipaNaMpesaService.listenToPaymentUpdates(
      mpesaData,
    );
    this.server.emit('onLipaNaMpesaTransaction', updates);
    return updates;
  }
}
