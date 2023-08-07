import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import axios from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Payments, PaymentsDocument } from './schema/payments.schema';
import { Model } from 'mongoose';
import { JwtPayload } from 'src/types/jwt-payload';
import PaginationQueryType from 'src/types/paginationQuery';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payments.name)
    private readonly paymentModel: Model<PaymentsDocument>,
  ) {}
  async sendStk(user: JwtPayload, createPaymentDto: CreatePaymentDto) {
    const authURL =
      'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';

    const stkPushURL =
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';

    const shortCode = 174379;

    const callbackUrl = 'https://api.nganyaapp.com/api/lipa-na-mpesa/callback';

    const basic_token =
      'YlhBVGFVbDlOc1pxbndNQW9RVFpKMDhVc25iYVRJTzY6MEZOUWhvR0FoczA4TDJ0ZA==';

    const passkey =
      'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919';

    const date = new Date(Date.now());
    const pad2 = (n: string | number) => (Number(n) < 10 ? '0' + n : n);
    const timestamp =
      date.getFullYear().toString() +
      pad2(date.getMonth() + 1) +
      pad2(date.getDate()) +
      pad2(date.getHours()) +
      pad2(date.getMinutes()) +
      pad2(date.getSeconds());

    const password = Buffer.from(shortCode + passkey + timestamp).toString(
      'base64',
    );

    try {
      let accesstoken = null;

      await axios({
        url: authURL,
        method: 'get',
        headers: {
          Authorization: 'Basic ' + basic_token,
        },
      }).then((res) => {
        accesstoken = res.data.access_token;
      });

      await axios({
        url: stkPushURL,
        method: 'POST',
        headers: {
          Authorization: `Bearer ` + accesstoken,
        },
        data: {
          BusinessShortCode: shortCode,
          Password: password,
          Timestamp: timestamp,
          TransactionType: 'CustomerPayBillOnline',
          Amount: createPaymentDto.amountPaid,
          PartyA: createPaymentDto.customerPhoneNo,
          PartyB: shortCode,
          PhoneNumber: createPaymentDto.customerPhoneNo,
          CallBackURL: callbackUrl,
          AccountReference: 'Nganya',
          TransactionDesc: 'Payment of X',
        },
      }).then(async (res) => {
        const response = res.data;
        await this.paymentModel.create({
          CheckoutRequestID: res.data.CheckoutRequestID,
          ...response,
          createPaymentDto,
          UserId: user._id,
          UserFirstName: user.firstName,
          UserSecondName: user.secondName,
          AgentStation: user.station,
          ServiceDescription: 'Payment',
        });
        throw new HttpException(res.data, 200);
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }

    // Store details in db
  }

  create(createPaymentDto: CreatePaymentDto) {
    return 'This action adds a new payment';
  }

  async findAll(
    user: JwtPayload,
    transactionMethod: string,
    transactionType: string,
    agent: string,
    station: string,
    pagination: PaginationQueryType,
  ): Promise<{
    data: Payments[];
    page: number;
    resPerPage: number;
    totalPages: number;
  }> {
    try {
      if (
        user.role !== 'Super User' &&
        user.role !== 'general admin' &&
        user.role !== 'admin' &&
        user.role !== 'station manager'
      ) {
        throw new UnauthorizedException(
          'You are not authorised to access this information',
        );
      }
      const query: any = {};
      if (transactionMethod) {
        query.TransactionMethod = transactionMethod;
      }
      if (transactionType) {
        query.transactionType;
      }
      if (agent) {
        query.agent;
      }
      if (station) {
        query.station;
      }
      const { page, resPerPage } = pagination;

      const [payments, totalCount] = await Promise.all([
        this.paymentModel
          .find(query)
          .skip(pagination.skip)
          .limit(pagination.resPerPage),
        this.paymentModel.countDocuments(query),
      ]);

      return {
        data: payments,
        page,
        resPerPage,
        totalPages: Math.ceil(totalCount / resPerPage),
      };
    } catch (err) {
      throw new HttpException(err.status, err.message);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
