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

    const res = this.authSvc.validateToken(authorization);

    req.session.user = res;

    return res as any;
  }
}
