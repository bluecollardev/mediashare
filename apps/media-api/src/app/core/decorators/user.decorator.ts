import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator((data, context: ExecutionContext) => {
  console.log(context.switchToHttp());
  const ctx = context.switchToHttp().getRequest();
  const user = ctx.session?.user ?? null;
  return user ? { ...user, _id: user._id } : {};
});

export const GetUserId = createParamDecorator((data, context: ExecutionContext) => {
  const ctx = context.switchToHttp().getRequest();
  const user = ctx.session?.user ?? null;
  return user?._id ? user._id.toString() : undefined;
});
