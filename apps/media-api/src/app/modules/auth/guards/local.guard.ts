import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    console.log('🚀 ---------------------------------------------------------------------------------');
    console.log('🚀 ~ file: local.guard.ts ~ line 11 ~ LocalGuard ~ canActivate ~ request', request);
    console.log('🚀 ---------------------------------------------------------------------------------');
    const loggedIn = await super.logIn(request);

    console.log(loggedIn);
    return result;
  }
}
