import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import crypto from "crypto";

@Injectable()
export class AuthGuard implements CanActivate {
    private readonly secretKey: string = process.env.PRESENCE_SECRET_KEY;

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const receivedSignature = request.headers['presence-signature'];
        const eventData = request.body;

        const calculateSignature = crypto
            .createHmac('sha256', this.secretKey)
            .update(JSON.stringify(eventData))
            .digest('hex');

        const isSignatureValid = receivedSignature === calculateSignature;

        return isSignatureValid;
    }
}