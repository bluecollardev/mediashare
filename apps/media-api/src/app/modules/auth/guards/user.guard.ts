import { CanActivate, Inject, ExecutionContext, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs/operators';
import { AuthService } from '../../../../../../media-auth/src/app/auth/auth.service';

export class UserGuard implements CanActivate {
  constructor(
    @Inject('AUTH_CLIENT')
    private readonly client: ClientProxy,
    private AuthSvc: AuthService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const { authorization } = req.headers;
    console.log(req.isAuthenticated(authorization.replace('Bearer', '').replace(' ', '')));

    try {
      const res = await this.client
        .send({ role: 'auth', cmd: 'check' }, { jwt: authorization.replace('Bearer', '').replace(' ', '') })
        .pipe(timeout(5000))
        .toPromise<boolean>();

      req.session.user = res;

      return res;
    } catch (err) {
      return false;
    }
  }
}
