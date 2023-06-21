import { Controller, Body, HttpStatus, Post } from '@nestjs/common';
import { SmsService } from "./sms.service";
import { SmsDto } from "./dto/sms.dto";

@Controller('sms')
export class SmsController {
    constructor(private readonly smsService: SmsService) {}

    @Post()
    async sendSms(@Body() smsDto: SmsDto ) {
        try {
            const result = await this.smsService.sendSMS(smsDto);
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
