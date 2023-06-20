import { Injectable } from '@nestjs/common';
// @ts-ignore
import * as AfricasTalking from 'africastalking';
import { AfricasTalkingOptions, SmsResponse } from "./sms.interface";
@Injectable()
export class SmsService {
    private africasTalking: typeof AfricasTalking.SMS;

    constructor() {
        const options: AfricasTalkingOptions = {
            apiKey: '9b41f958e5d5f80605aa61f0acc3f7150d382e37ebaa995eaa87623c9332dad9',
            username: 'nganya'
        };
        this.africasTalking = new AfricasTalking.SMS(options);
    }

    async sendSMS(phone: string | string[], message: string): Promise<SmsResponse> {
        try {
            const result = await this.africasTalking.send({
                to: Array.isArray(phone) ? phone : [phone],
                message: message,
            });
            return result;
        } catch (error) {
            throw error;
        }
    }
}
