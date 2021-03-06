import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CreatDto = createParamDecorator((data, context: ExecutionContext) => {
  const ctx = context.switchToHttp().getRequest();
  const user = ctx.session?.passport?.user ?? null;

  return { ...ctx.body, createdBy: user?._id };
});
