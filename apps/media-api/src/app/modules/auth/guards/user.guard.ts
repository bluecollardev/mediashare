import { CanActivate, Inject, ExecutionContext, Logger, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private authSvc: AuthService) {}

  canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    console.log(req.headers);

    const { authorization } = req.headers;
    console.log('🚀 -------------------------------------------------------------------------------------------');
    console.log('🚀 ~ file: user.guard.ts ~ line 15 ~ UserGuard ~ canActivate ~ authorization', authorization.replace('Bearer', '').replace(' ', ''));
    console.log('🚀 -------------------------------------------------------------------------------------------');
    console.log(req.isAuthenticated(authorization.replace('Bearer', '').replace(' ', '')));

    const res = this.authSvc.validateToken(authorization);
    console.log('🚀 -----------------------------------------------------------------------');
    console.log('🚀 ~ file: user.guard.ts ~ line 19 ~ UserGuard ~ canActivate ~ res', res);
    console.log('🚀 -----------------------------------------------------------------------');

    req.session.user = res;

    return res as any;
  }
}
