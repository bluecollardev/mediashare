import { CanActivate, Inject, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private authSvc: AuthService, private userSvc: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const { authorization } = req.headers;

    const res = this.authSvc.validateToken(authorization.split(' ')[1]);
    const user = await this.userSvc.findByQuery({ sub: res.sub });
    req.session.user = user;

    return res as any;
  }
}
