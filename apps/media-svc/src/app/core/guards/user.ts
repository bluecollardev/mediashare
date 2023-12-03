import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { getSub } from '@mediashare/core/utils/auth';

export const USER_CONTEXT_PROPERTY = 'user';

export function defaultOptionsWithBearer(token: string) {
  return {
    headers: {
      'authorization': `Bearer ${token}`
    }
  } as AxiosRequestConfig;
}

@Injectable()
export class UserGuard implements CanActivate {
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    try {
      const request = ctx.switchToHttp().getRequest();
      return !!getSub(request);
    } catch (err) {
      // TODO: Real error handling here plz!
      console.log(err);
      throw err;
    }
  }
}
