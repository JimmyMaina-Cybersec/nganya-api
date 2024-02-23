import {
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { JwtPayload, OldJwtPayload } from 'src/types/jwt-payload';

export const OldCurrentUser = createParamDecorator(
  (data: string | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (!data) return request?.auth?.payload as OldJwtPayload;

    return request.user[data];
  },
);

export const CurrentUser = createParamDecorator(
  (data: string | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (!data) return request?.auth?.payload as JwtPayload;

    return request.user[data];
  },
);