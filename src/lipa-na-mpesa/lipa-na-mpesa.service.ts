import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LipaDto } from './dto/create-lipa-na-mpesa.dto';
import { LipaNaMpesaCallbackDto } from './dto/lipa-na-mpesa-callback.dto';
import { JwtPayload } from 'src/types/jwt-payload';
import axios from 'axios';
import {
  LipaNaMpesaTransaction,
  LipaNaMpesaTransactionDocument,
} from './schema/lipa-na-mpesa.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StkInitResponce } from './types/stk-init-reponce.type';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CheckBalanceDTO } from './dto/checkBalance.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class LipaNaMpesaService {
  constructor(
    @InjectModel(LipaNaMpesaTransaction.name)
    private lipaNaMpesaTransaction: Model<LipaNaMpesaTransactionDocument>,
    private eventEmitter: EventEmitter2,
    private httpService: HttpService,
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
      const accessToken = await this.getAccessToken();

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
        .then(async (res) => {
          result = res.data;

          this.eventEmitter.emit('mpesapayment.created', {
            CheckoutRequestID: result.CheckoutRequestID,
            data: result,
          });

          await this.lipaNaMpesaTransaction.create({
            CheckoutRequestID: result.CheckoutRequestID,
            ...result,
            Amount: lipaDTO.amount,
            firstName: lipaDTO.firstName,
            secondName: lipaDTO.secondName,
            idNo: lipaDTO.idNo,

            phone: lipaDTO.phone,
            sacco: user.sacco,
            agent: user._id,
            station: user.station,
          });
        })
        .catch((err) => {
          console.log(err);

          throw new HttpException(err.message, HttpStatus.BAD_GATEWAY);
        });

      return result;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  /**
   * Get the account balance for a given till/paybill number from Daraja API
   * @param checkBalanceDTO The till/paybill number for which to retrieve the balance
   * @param user
   * @returns The account balance as a number.
   */
  async getAccountBalance(
    user: JwtPayload,
    checkBalanceDTO: CheckBalanceDTO,
  ): Promise<number> {
    if (
      user.role !== 'Super User' &&
      user.role !== 'general admin' &&
      user.role !== 'admin' &&
      user.role !== 'station manager'
    ) {
      throw new UnauthorizedException(
        'You do not have access to account balance',
      );
    }

    const { organisationType, phoneOrAccountNumber, shortCode } =
      checkBalanceDTO;

    const accessToken = await this.getAccessToken();

    const darajaBalanceEndpoint =
      'https://sandbox.safaricom.co.ke/mpesa/accountbalance/v1/query';

    const identifierType = organisationType === 'Till' ? 1 : 4;

    try {
      const response = await firstValueFrom(
        this.httpService.get(darajaBalanceEndpoint, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            Initiator: '',
            SecurityCredential: '',
            CommandID: 'AccountBalance',
            PartyA: phoneOrAccountNumber,
            PartyB: shortCode,
            IdentifierType: identifierType,
            Remarks: 'Account balance query',
          },
          timeout: 120000,
        }),
      );

      const balance = response.data.Balance;
      return balance;
    } catch (error) {
      if (axios.isCancel(error)) {
        throw new Error('Requst timed out');
      } else {
        throw new Error(error.message);
      }
    }
  }

  /**
   *
   * # Mpesa callback url
   *
   * @param mpesaResponse
   * @returns
   *
   */
  async mpesaCallback(mpesaResponse: any) {
    try {
      await this.lipaNaMpesaTransaction.findOneAndUpdate(
        {
          CheckoutRequestID: mpesaResponse.Body?.stkCallback.CheckoutRequestID,
        },
        {
          MerchantRequestID: mpesaResponse.Body?.stkCallback?.MerchantRequestID,
          CheckoutRequestID: mpesaResponse.Body?.stkCallback?.CheckoutRequestID,
          ResultCode: mpesaResponse.Body?.stkCallback?.ResultCode,
          ResultDesc: mpesaResponse.Body?.stkCallback?.ResultDesc,
          MpesaReceiptNumber:
            mpesaResponse.Body?.stkCallback?.CallbackMetadata?.Item[1]?.Value ??
            null,
          Balance:
            mpesaResponse.Body?.stkCallback?.CallbackMetadata?.Item[2]?.Value ??
            null,
          TransactionDate:
            mpesaResponse.Body?.stkCallback?.CallbackMetadata?.Item[3]?.Value ??
            null,
          PhoneNumber:
            mpesaResponse.Body?.stkCallback?.CallbackMetadata?.Item[4]?.Value ??
            null,

          transaction: [mpesaResponse],
        },
      );

      this.eventEmitter.emit('mpesapayment.created', {
        CheckoutRequestID: mpesaResponse.Body?.stkCallback.CheckoutRequestID,
        data: mpesaResponse,
      });

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

  update(id: number, updateLipaNaMpesaDto: LipaNaMpesaCallbackDto) {
    return `This action updates a #${id} lipaNaMpesa`;
  }

  remove(id: number) {
    return `This action removes a #${id} lipaNaMpesa`;
  }

  async listenToPaymentUpdates(mpesaData: {
    CheckoutRequestID: string;
    data: any;
  }) {
    console.log(mpesaData);

    return mpesaData;
  }

  private async getAccessToken(): Promise<string> {
    try {
      const response = await axios({
        method: 'get',
        url: this.authorisationEndpoint,
        headers: {
          Authorization:
            'Basic YlhBVGFVbDlOc1pxbndNQW9RVFpKMDhVc25iYVRJTzY6MEZOUWhvR0FoczA4TDJ0ZA==',
        },
      });
      return response.data.access_token;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.BAD_GATEWAY);
    }
  }
}
