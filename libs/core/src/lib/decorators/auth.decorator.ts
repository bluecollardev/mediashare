import { defaultSubClaimName, getAuthCtx } from '@mediashare/core/utils/auth';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetClaims = createParamDecorator(
  (keys: string | string[], ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const authCtx = getAuthCtx(request);

    if (!keys) {
      return authCtx;
    }

    if (Array.isArray(keys)) {
      return keys.reduce((result, key) => {
        // @ts-ignore
        result[key] = authCtx[key];
        return result;
      }, {});
    }

    return authCtx[keys];
  }
);
