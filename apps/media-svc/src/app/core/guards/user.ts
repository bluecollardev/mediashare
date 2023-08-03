import { COGNITO_JWT_PAYLOAD_CONTEXT_PROPERTY } from '@nestjs-cognito/auth';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';

export const USER_CONTEXT_PROPERTY = 'user';

export function defaultOptionsWithBearer(token) {
  return {
    headers: {
      'authorization': `Bearer ${token}`
    }
  } as AxiosRequestConfig;
}

@Injectable()
export class UserGuard implements CanActivate {
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request = ctx.switchToHttp().getRequest();
    const payload = request[COGNITO_JWT_PAYLOAD_CONTEXT_PROPERTY];
    const idKey = 'sub';
    const sub = payload[`cognito:${idKey}`] || payload[idKey]
    try {
      // Forward request headers
      const result = await axios.get(`http://localhost:3000/api/user/sub/${sub}`, { headers: { 'authorization': request.headers['authorization'] } } as any);
      request[USER_CONTEXT_PROPERTY] = result.data;
      return !!request[USER_CONTEXT_PROPERTY];
    } catch (err) {
      // TODO: Real error handling here plz!
      console.log(err);
      throw err;
    }
  }
}
