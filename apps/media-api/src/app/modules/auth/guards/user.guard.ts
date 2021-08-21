import { CanActivate, Inject, ExecutionContext, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs/operators';
import { AuthService } from '../../../../../../media-auth/src/app/auth/auth.service';

export class UserGuard implements CanActivate {
  constructor(private authSvc: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    console.log(req.headers);

    const { authorization } = req.headers;
    console.log(req.isAuthenticated(authorization.replace('Bearer', '').replace(' ', '')));

    try {
      const res = this.authSvc.validateToken;

      req.session.user = res;

      return res as any;
    } catch (err) {
      return false;
    }
  }
}
