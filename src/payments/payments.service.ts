import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import axios from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Payments, PaymentsDocument } from './schema/payments.schema';
import { Model } from 'mongoose';
import { OldJwtPayload } from 'src/types/jwt-payload';
import PaginationQueryType from 'src/types/paginationQuery';
import { TransactionType } from 'src/types/transactionMethod';
import { UsersQuery } from 'src/types/usersQuery';
import { LipaNaMpesa, LipaNaMpesaDocument } from './schema/lipaNaMpesa.schema';
import { PushSTK, PushSTKDocument } from './schema/pushSTK.schema';
import { CustomerDocument, Customers } from './schema/customer.schema';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payments.name)
    private readonly paymentModel: Model<PaymentsDocument>,
    @InjectModel(LipaNaMpesa.name)
    private readonly lipaNaMpesaModel: Model<LipaNaMpesaDocument>,
    @InjectModel(PushSTK.name)
    private readonly pushSTKModel: Model<PushSTKDocument>,
    @InjectModel(Customers.name)
    private readonly customerModel: Model<CustomerDocument>,
  ) { }

  readonly authURL =
    'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';

  readonly stkPushURL =
    'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';

  readonly shortCode = 174379;

  readonly callbackUrl = 'https://api.nganyaapp.com/api/lipa-na-mpesa/callback';

  readonly basic_token =
    'YlhBVGFVbDlOc1pxbndNQW9RVFpKMDhVc25iYVRJTzY6MEZOUWhvR0FoczA4TDJ0ZA==';

  readonly passkey =
    'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919';

  async sendStk(user: OldJwtPayload, createPaymentDto: CreatePaymentDto) {
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
      this.shortCode + this.passkey + timestamp,
    ).toString('base64');

    try {
      const accessToken = await this.getAccessToken();

      await axios({
        url: this.stkPushURL,
        method: 'POST',
        headers: {
          Authorization: `Bearer ` + accessToken,
        },
        data: {
          BusinessShortCode: this.shortCode,
          Password: password,
          Timestamp: timestamp,
          TransactionType: 'CustomerPayBillOnline',
          Amount: createPaymentDto.amountPaid,
          PartyA: createPaymentDto.customerPhoneNo,
          PartyB: this.shortCode,
          PhoneNumber: createPaymentDto.customerPhoneNo,
          CallBackURL: this.callbackUrl,
          AccountReference: 'Nganya',
          TransactionDesc: 'Payment of X',
        },
      }).then(async (res) => {
        const response = res.data;
        const currentPushSTK = await this.pushSTKModel.create({
          CheckoutRequestID: res.data.CheckoutRequestID,
          ...response,
          Amount: createPaymentDto.amountPaid,
          AgentStationId: user.station,
          ReceivingAgentId: user._id,
          SaccoId: user.sacco,
        });
        const currentCustomer = await this.customerModel.create({
          customerFirstName: createPaymentDto.customerFirstName,
          customerLastName: createPaymentDto.customerLastName,
          customerPhoneNo: createPaymentDto.customerPhoneNo,
          customerNationalId: createPaymentDto.customerNationalId,
          customerAddress: createPaymentDto.customerAddress,
          customerEmail: createPaymentDto.customerEmail,
        });
        await this.paymentModel.create({
          TransactionType: 'pushSTK',
          PushSTKId: await this.pushSTKModel.findById(currentPushSTK),
          AmountPaid: createPaymentDto.amountPaid,
          CustomerId: await this.customerModel.findById(currentCustomer),
          AgentStationId: user.station,
          ReceivingAgentId: user._id,
          SaccoId: user.sacco,
          ServiceDescription: 'Payment',
        });
        throw new HttpException(res.data, 200);
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll(
    user: OldJwtPayload,
    transactionType: TransactionType,
    pagination: PaginationQueryType,
  ): Promise<{
    data: Payments[];
    page: number;
    resPerPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    try {
      if (!user || !user.role) {
        throw new UnauthorizedException(
          'You are not authorized to access payments',
        );
      }

      const query: UsersQuery = {};
      if (user.role == 'station manager') {
        query.station = user.station;
      } else if (user.role == 'station agent') {
        query._id = user._id;
      } else {
        throw new UnauthorizedException('You are not allowed to view payments');
      }

      let payments = [];
      let conditionQuery = {};

      if (transactionType.pushSTK) {
        conditionQuery = { ...query, PushSTKId: { $exists: true, $ne: null } };
      } else if (transactionType.lipaNaMpesa) {
        conditionQuery = {
          ...query,
          LipaNaMpesaId: { $exists: true, $ne: null },
        };
      } else if (transactionType.cashPayments) {
        conditionQuery = {
          ...query,
          CashPaymentsId: { $exists: true, $ne: null },
        };
      } else {
        throw new BadRequestException('Invalid transaction type');
      }

      payments = await this.paymentModel
        .find(conditionQuery)
        .skip(pagination.skip)
        .limit(pagination.resPerPage)
        .select('-__v');

      const docsCount = await this.paymentModel.countDocuments(conditionQuery);

      return {
        data: payments,
        page: pagination.page,
        resPerPage: pagination.resPerPage,
        totalPages: Math.ceil(docsCount / pagination.resPerPage),
        totalItems: docsCount,
      };
    } catch (err) {
      throw new HttpException(err.status, err.message);
    }
  }

  async mpesaCallback(mpesaResponse: any) {
    try {
      await this.pushSTKModel.findOneAndUpdate(
        {
          CheckoutRequestID: mpesaResponse.Body?.stkCallback.CheckoutRequestID,
        },
        {
          CheckoutRequestID: mpesaResponse.Body?.stkCallback?.CheckoutRequestID,
          MerchantRequestID: mpesaResponse.Body?.stkCallback?.MerchantRequestID,
          ResultCode: mpesaResponse.Body?.stkCallback?.ResultCode,
          ResultDesc: mpesaResponse.Body?.stkCallback?.ResultDesc,
          MpesaReceiptNumber:
            mpesaResponse.Body?.stkCallback?.CallbackMetadata?.Item[1]?.Value ??
            null,
          TransactionDate:
            mpesaResponse.Body?.stkCallback?.CallbackMetadata?.Item[3]?.Value ??
            null,
          PhoneNumber:
            mpesaResponse.Body?.stkCallback?.CallbackMetadata?.Item[4]?.Value ??
            null,
        },
      );

      throw new HttpException('Transaction saved successfully', HttpStatus.OK);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAllLipaNaMpesa(user: OldJwtPayload, pagination: PaginationQueryType) {
    try {
      if (!user || !user.role) {
        throw new UnauthorizedException(
          'You are not authorized to access Lipa Na M-Pesa payments',
        );
      }

      const query: UsersQuery = {};
      if (user.role === 'station manager') {
        query.station = user.station;
      } else if (user.role === 'station agent') {
        query._id = user._id;
      } else {
        throw new UnauthorizedException(
          'You are not allowed to view Lipa Na M-Pesa payments',
        );
      }

      const payments = await this.lipaNaMpesaModel
        .find({ ...query, status: 'pending' })
        .skip(pagination.skip)
        .limit(pagination.resPerPage)
        .select('-__v');

      const docsCount = await this.lipaNaMpesaModel.countDocuments(query);

      return {
        data: payments,
        page: pagination.page,
        resPerPage: pagination.resPerPage,
        totalPages: Math.ceil(docsCount / pagination.resPerPage),
        totalItems: docsCount,
      };
    } catch (error) {
      throw new HttpException(error.message, error.data);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  async update(user: OldJwtPayload, id: string) {
    if (user.role != 'station manager' && user.role != 'station agent') {
      throw new UnauthorizedException(
        'You are not allowed to perform this action',
      );
    }

    return await this.lipaNaMpesaModel
      .findByIdAndUpdate(
        id,
        {
          status: 'claimed',
        },
        { new: true },
      )
      .exec();
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }

  async getAccessToken(): Promise<string> {
    try {
      const response = await axios({
        method: 'get',
        url: this.authURL,
        headers: {
          Authorization: 'Basic ' + this.basic_token,
        },
      });
      console.log('access token = ' + response.data.access_token);
      return response.data.access_token;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.BAD_GATEWAY);
    }
  }
}
