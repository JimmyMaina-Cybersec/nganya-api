import { Controller, Body, HttpStatus, Post } from '@nestjs/common';
import { SmsService } from "./sms.service";
import { SmsDto } from "./dto/sms.dto";

@Controller('sms')
export class SmsController {
    constructor(private readonly smsService: SmsService) {}

    @Post()
    async sendSms(@Body() smsDto: SmsDto ) {
        return this.smsService.sendSMS(smsDto);
    }
}
