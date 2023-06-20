import { Controller, Body, HttpStatus, Post } from '@nestjs/common';
import { SmsService } from "./sms.service";

@Controller('sms')
export class SmsController {
    constructor(private readonly smsService: SmsService) {}

    @Post()
    async sendSms(@Body() body: { phone: string; message: string }): Promise<any> {
        if ( !body.phone || !body.message ) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Phone number and message are required',
            };
        }

        try {
            const result = await this.smsService.sendSMS(body.phone, body.message);
            return {
                statusCode: HttpStatus.OK,
                message: 'Message sent successfully',
                result,
            };
        } catch (error) {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'An error occurred while sending the message',
                error: error,
            };
        }
    }
}
