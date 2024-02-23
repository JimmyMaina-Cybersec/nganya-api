import { Injectable, HttpStatus, BadRequestException } from '@nestjs/common';
import { SmsDto } from "./dto/sms.dto";
import * as AfricasTalking from "africastalking";
@Injectable()
export class SmsService {
    private africasTalking: any;
    private readonly credentials: { readonly apiKey: string; readonly username: string };

    constructor() {
        this.credentials = {
            apiKey: '9b41f958e5d5f80605aa61f0acc3f7150d382e37ebaa995eaa87623c9332dad9',
            username: 'nganya'
        };
        this.africasTalking = AfricasTalking(this.credentials);
    }

    async sendSMS(smsDto: SmsDto) {
        if (!smsDto.phones || !smsDto.message) {
            throw new BadRequestException('Phone number and message are required')
        }
        try {
            const sms = this.africasTalking.SMS;

            const options = {
                to: smsDto.phones,
                message: smsDto.message,
            };
            const response = await sms.send(options);
            return {
                statusCode: HttpStatus.OK,
                message: 'Message has been sent successfully',
                response,
            };
        } catch (error) {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'An error occurred while sending the message',
                error,
            };
        }
    }
}
