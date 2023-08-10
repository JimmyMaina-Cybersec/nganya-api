import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { promisify } from 'util';
import { expressjwt } from 'express-jwt';
import { expressJwtSecret } from 'jwks-rsa';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  private readonly AUTH0_AUDIENCE: string;
  private readonly AUTH0_DOMAIN: string;
  private readonly AUTH0_ISSUER_URL: string;

  constructor(private configurationService: ConfigService) {
    this.AUTH0_AUDIENCE = configurationService.get<string>('AUTH0_AUDIENCE');
    this.AUTH0_DOMAIN = configurationService.get<string>('AUTH0_DOMAIN');
    this.AUTH0_ISSUER_URL =
      configurationService.get<string>('AUTH0_ISSUER_URL');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.getArgByIndex(0);
    const res = context.getArgByIndex(1);

    console.log(this.AUTH0_AUDIENCE);

    const checkJWT = promisify(
      expressjwt({
        secret: expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `${this.AUTH0_DOMAIN}.well-known/jwks.json}`,
        }) as any,
        issuer: this.AUTH0_ISSUER_URL,
        audience: this.AUTH0_AUDIENCE,
        algorithms: ['RS256'],
      }),
    );

    try {
      await checkJWT(req, res);
      return true;
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException(e.message);
    }
  }
}
