import { COGNITO_JWT_PAYLOAD_CONTEXT_PROPERTY } from '@nestjs-cognito/auth';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserService } from './user.service';

export const USER_CONTEXT_PROPERTY = 'user';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private userSvc: UserService) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request = ctx.switchToHttp().getRequest();
    const payload = request[COGNITO_JWT_PAYLOAD_CONTEXT_PROPERTY];
    const idKey = 'sub';
    const sub = payload[`cognito:${idKey}`] || payload[idKey];

    request[USER_CONTEXT_PROPERTY] = await this.userSvc.findByQuery({
      where: { sub },
    });
    return !!request[USER_CONTEXT_PROPERTY];
  }
}
