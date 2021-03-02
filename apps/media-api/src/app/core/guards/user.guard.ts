import { CanActivate, Inject, ExecutionContext, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PinoLogger } from 'nestjs-pino';
import { timeout } from 'rxjs/operators';

export class UserGuard implements CanActivate {
  constructor(
    @Inject('AUTH_CLIENT')
    private readonly client: ClientProxy,
    private logger: PinoLogger
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    Logger.warn(req.headers);
    const { authorization } = req.headers;
    try {
      const res = await this.client
        .send({ role: 'auth', cmd: 'check' }, { jwt: authorization })
        .pipe(timeout(5000))
        .toPromise<boolean>();

      return res;
    } catch (err) {
      return false;
    }
  }
}
