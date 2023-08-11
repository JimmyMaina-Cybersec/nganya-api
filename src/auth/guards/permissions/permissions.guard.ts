import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const [req] = context.getArgs();
    const permissions: Array<string> = req?.auth?.payload?.permissions || [];
    const requiredPermissions =
      this.reflector.get<string[]>('permissions', context.getHandler()) || [];
    const hasAllRequiredPermissions = requiredPermissions.every((permission) =>
      permissions.includes(permission),
    );
    console.log('req', req);
    console.log('permissions', permissions);

    if (requiredPermissions.length === 0 || hasAllRequiredPermissions) {
      console.log('hasAllRequiredPermissions', hasAllRequiredPermissions);
      return true;
    }
    throw new ForbiddenException('Insufficient Permissions');
  }
}
