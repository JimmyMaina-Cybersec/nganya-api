import { Injectable } from '@nestjs/common';
import { SmsDto } from "./dto/sms.dto";
import * as AfricasTalking from "africastalking";
@Injectable()
export class SmsService {
    private africasTalking: any;

    constructor() {
        const credentials = {
            apiKey: '9b41f958e5d5f80605aa61f0acc3f7150d382e37ebaa995eaa87623c9332dad9',
            username: 'nganya'
        };
        this.africasTalking = AfricasTalking(credentials);
    }

    async sendSMS(smsDto: SmsDto) {
        const sms = this.africasTalking.SMS;

        const options = {
            to: smsDto.phones,
            message: smsDto.message,
        };
        try {
            const response = await sms.send(options);
            return response;
        } catch (error) {
            throw error;
        }
    }
}
// 