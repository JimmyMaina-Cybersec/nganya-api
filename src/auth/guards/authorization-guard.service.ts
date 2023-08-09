import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
// import { expressJwtSecret}  from "jwks-rsa";
import { promisify } from 'util';
import { expressjwt } from 'express-jwt';
import { expressJwtSecret } from 'jwks-rsa';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  private AUTH0_AUDIENCE: string;
  private AUTH0_DOMAIN: string;

  constructor(private congurationService: ConfigService) {
    this.AUTH0_AUDIENCE = congurationService.get<string>('AUTH0_AUDIENCE');
    this.AUTH0_DOMAIN = congurationService.get<string>('AUTH0_DOMAIN');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.getArgByIndex(0);
    const res = context.getArgByIndex(1);

    const checkJWT = promisify(
      expressjwt({
        secret: expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `${this.AUTH0_DOMAIN}.well-known/jwks.json}`,
        }) as any,
        issuer: this.AUTH0_DOMAIN,
        audience: this.AUTH0_AUDIENCE,
        algorithms: ['RS256'],
      }),
    );

    try {
      await checkJWT(req, res);
      return true;
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }
}
