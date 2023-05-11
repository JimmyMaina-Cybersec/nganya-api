import { Injectable } from '@nestjs/common';
import { CreateLipaNaMpesaDto as LipaNaMpesaDto } from './dto/create-lipa-na-mpesa.dto';
import { UpdateLipaNaMpesaDto } from './dto/update-lipa-na-mpesa.dto';
import { JwtPayload } from 'src/types/jwt-payload';

@Injectable()
export class LipaNaMpesaService {
  readonly authorisationEndpoint =
    'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';

  readonly stkEndpoint =
    'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';

  /**
   *
   * # Initialise th push stk
   * . it requres Auth
   *
   * @param createLipaNaMpesaDto
   * @param user
   * @returns
   */
  sendStk(createLipaNaMpesaDto: LipaNaMpesaDto, user: JwtPayload) {
    console.log(createLipaNaMpesaDto);

    return 'This action adds a new lipaNaMpesa';
  }

  /**
   *
   * # Mpesa callback url
   *
   * @param createLipaNaMpesaCallbackDto
   * @returns
   *
   */
  mpesaCallback(createLipaNaMpesaCallbackDto: any) {
    console.log(createLipaNaMpesaCallbackDto);

    return 'This action adds a new lipaNaMpesa';
  }

  findAll() {
    return `This action returns all lipaNaMpesa`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lipaNaMpesa`;
  }

  update(id: number, updateLipaNaMpesaDto: UpdateLipaNaMpesaDto) {
    return `This action updates a #${id} lipaNaMpesa`;
  }

  remove(id: number) {
    return `This action removes a #${id} lipaNaMpesa`;
  }
}
