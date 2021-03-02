import { createParamDecorator, ExecutionContext, Logger } from '@nestjs/common';

export const GetUser = createParamDecorator((data, context: ExecutionContext) => {
  const ctx = context.switchToHttp().getRequest();
  return ctx.session?.passport?.user ?? null;
});
