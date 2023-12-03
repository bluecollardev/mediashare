import { COGNITO_JWT_PAYLOAD_CONTEXT_PROPERTY } from '@nestjs-cognito/auth';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class UserGuard implements CanActivate {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request = ctx.switchToHttp().getRequest();
    const payload = request[COGNITO_JWT_PAYLOAD_CONTEXT_PROPERTY];
    const idKey = 'sub';
    const sub = payload[`cognito:${idKey}`] || payload[idKey];
    return !!sub;
  }
}
