import { Injectable } from '@nestjs/common';
import { SMS, AfricasTalkingOptions } from 'africastalking';
@Injectable()
export class SmsService {
    private africasTalking: SMS;

    constructor() {
        const options: AfricasTalkingOptions = {
            apiKey: '9b41f958e5d5f80605aa61f0acc3f7150d382e37ebaa995eaa87623c9332dad9',
            usrname: 'nganya'
        };
        this.africasTalking = new SMS(options);
    }

    async sendSMS(phone: string | string[], message: string): Promise<any> {
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
