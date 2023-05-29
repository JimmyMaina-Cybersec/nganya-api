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
import {} from 'mongodb';

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
  async handleMessage(@MessageBody() CheckoutRequestID: string) {
    let trans = await this.lipaNaMpesaTransaction.findOne({
      CheckoutRequestID: CheckoutRequestID,
    });
    this.server.emit('onLipaNaMpesaTransaction', {
      trans,
    });
    const transaction = this.lipaNaMpesaTransaction.watch();
    console.log('after watch');

    transaction.on('connection', (data) => {
      console.log('data');
      this.server.emit('onLipaNaMpesaTransaction', 'data.fullDocument');
      if (data.operationType === 'update') {
        // TODO:Remember to remove this console.log
        console.log(data.fullDocument);

        this.server
          // .to(CheckoutRequestID)
          .emit('onLipaNaMpesaTransaction', data.fullDocument);

        //   if (
        //     (data.fullDocument as LipaNaMpesaTransactionDocument).ResultCode
        //   ) {
        //     transaction.close();
        //   }
      }
    });
  }
}
