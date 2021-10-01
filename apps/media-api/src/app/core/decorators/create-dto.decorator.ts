import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ObjectIdGuard } from '@util-lib';

export const CreateDto = createParamDecorator((data, context: ExecutionContext) => {
  const ctx = context.switchToHttp().getRequest();
  const user = ctx.session?.passport?.user ?? null;
  return { ...ctx.body, createdBy: ObjectIdGuard(user?._id) };
});
