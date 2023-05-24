import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '@api-modules/auth/auth.service';
import { UserService } from './user.service';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private authSvc: AuthService, private userSvc: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const { authorization } = req.headers;
    const res = this.authSvc.validateToken(authorization.split(' ')[1]);
    req.session.user = await this.userSvc.findByQuery({ sub: res.sub } as any);
    return res as any;
  }
}
