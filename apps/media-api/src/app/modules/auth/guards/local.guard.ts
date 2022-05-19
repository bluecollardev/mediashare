import { Injectable, ExecutionContext } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();

    const loggedIn = await super.logIn(request);

    console.log(loggedIn);
    return result;
  }
}
