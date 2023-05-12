import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LipaDto } from './dto/create-lipa-na-mpesa.dto';
import { UpdateLipaNaMpesaDto } from './dto/lipa-na-mpesa-callback.dto';
import { JwtPayload } from 'src/types/jwt-payload';
import axios from 'axios';
import {
  LipaNaMpesaTransaction,
  LipaNaMpesaTransactionDocument,
} from './schema/lipa-na-mpesa.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StkInitResponce } from './types/stk-init-reponce.type';

@Injectable()
export class LipaNaMpesaService {
  constructor(
    @InjectModel(LipaNaMpesaTransaction.name)
    private lipaNaMpesaTransaction: Model<LipaNaMpesaTransactionDocument>,
  ) {}

  readonly authorisationEndpoint =
    'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';

  readonly stkEndpoint =
    'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';

  readonly callback_url =
    'https://api.nganyaapp.com/api/lipa-na-mpesa/callback';

  /**
   *
   * # Initialise th push stk
   * . it requres Auth
   *
   * @param lipaDTO
   * @param user
   * @returns
   */
  async sendStk(lipaDTO: LipaDto, user: JwtPayload) {
    console.log(lipaDTO);

    const shortCode = '174379';

    const account_reference = null;

    const date = new Date(Date.now());
    const pad2 = (n: string | number) => (Number(n) < 10 ? '0' + n : n);
    const timestamp =
      date.getFullYear().toString() +
      pad2(date.getMonth() + 1) +
      pad2(date.getDate()) +
      pad2(date.getHours()) +
      pad2(date.getMinutes()) +
      pad2(date.getSeconds());

    const password = Buffer.from(
      shortCode +
        'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919' +
        timestamp,
    ).toString('base64');

    try {
      let accessToken = null;

      await axios({
        method: 'get',
        url: this.authorisationEndpoint,
        headers: {
          Authorization:
            'Basic cGVFOHc2bUt6WTNBWEFGTWZ5ank1NjhUUnJGZ2I2MDI6NG1jc0Z3cFR1VTI0d1JwbQ==',
        },
      })
        .then((res) => {
          accessToken = res.data.access_token;
        })
        .catch((err) => {
          console.log(err);

          throw new HttpException(err.message, HttpStatus.BAD_GATEWAY);
        });

      let result: StkInitResponce | null = null;

      await axios({
        method: 'post',
        url: this.stkEndpoint,
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
        data: {
          BusinessShortCode: shortCode,
          Password: password,
          Timestamp: timestamp,
          TransactionType: 'CustomerPayBillOnline',
          Amount: lipaDTO.amount,
          PartyA: lipaDTO.phone,
          PartyB: shortCode,
          PhoneNumber: lipaDTO.phone,
          CallBackURL: this.callback_url,
          AccountReference: 'Nganya',
          TransactionDesc: 'Ticket',
        },
      })
        .then((res) => {
          result = res.data;
        })
        .catch((err) => {
          console.log(err);

          throw new HttpException(err.message, HttpStatus.BAD_GATEWAY);
        });
      await this.lipaNaMpesaTransaction.create({
        CheckoutRequestID: result.CheckoutRequestID,
        ...result,
        Amount: lipaDTO.amount,
        firstName: lipaDTO.firstName,
        secondName: lipaDTO.secondName,
        phone: lipaDTO.phone,

        sacco: user.sacco,
        agent: user._id,
        station: user.station,
      });

      return result;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  /**
   *
   * # Mpesa callback url
   *
   * @param createLipaNaMpesaCallbackDto
   * @returns
   *
   */
  async mpesaCallback(createLipaNaMpesaCallbackDto: any) {
    try {
      await this.lipaNaMpesaTransaction.findOneAndUpdate(
        {
          CheckoutRequestID:
            createLipaNaMpesaCallbackDto.stkCallback.CheckoutRequestID,
        },
        {
          MerchantRequestID:
            createLipaNaMpesaCallbackDto.stkCallback.CheckoutRequestID,
          ResultCode: createLipaNaMpesaCallbackDto.stkCallback.ResultCode,
          ResultDesc: createLipaNaMpesaCallbackDto.stkCallback.ResultDesc,
          MpesaReceiptNumber:
            createLipaNaMpesaCallbackDto.stkCallback.CallbackMetadata[1]
              .Value ?? null,
          Balance:
            createLipaNaMpesaCallbackDto.stkCallback.CallbackMetadata[2]
              .Value ?? null,
          TransactionDate:
            createLipaNaMpesaCallbackDto.stkCallback.CallbackMetadata[3]
              .Value ?? null,
          PhoneNumber:
            createLipaNaMpesaCallbackDto.stkCallback.CallbackMetadata[4]
              .Value ?? null,
        },
      );
      throw new HttpException('Transaction saved successfully', HttpStatus.OK);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  findAll() {
    return `This action returns all lipaNaMpesa`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lipaNaMpesa`;
  }

  update(id: number, updateLipaNaMpesaDto: UpdateLipaNaMpesaDto) {
    return `This action updates a #${id} lipaNaMpesa`;
  }

  remove(id: number) {
    return `This action removes a #${id} lipaNaMpesa`;
  }
}
