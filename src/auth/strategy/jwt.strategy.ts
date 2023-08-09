import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as dotenv from 'dotenv';
import { passportJwtSecret } from 'jwks-rsa';
import { ConfigService } from '@nestjs/config';

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private AUTH0_AUDIENCE: string;
  private AUTH0_DOMAIN: string;


  constructor(private congurationService: ConfigService) {


    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${congurationService.get<string>('AUTH0_DOMAIN')}.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: congurationService.get<string>('AUTH0_AUDIENCE'),
      issuer: `${congurationService.get<string>('AUTH0_ISSUER_URL')}`,
      algorithms: ['RS256'],
    });


  }

  validate(payload: unknown): unknown {
    return payload;
  }
}
