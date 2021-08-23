import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ObjectIdGuard } from '@util-lib';
import { ObjectId } from 'mongodb';

export const GetUser = createParamDecorator((data, context: ExecutionContext) => {
  console.log(context.switchToHttp());
  const ctx = context.switchToHttp().getRequest();
  const user = ctx.session?.user ?? null;

  return user ? { ...user } : {};
});

export const GetUserId = createParamDecorator((data, context: ExecutionContext) => {
  const ctx = context.switchToHttp().getRequest();
  const user = ctx.session?.passport?.user ?? null;
  return user?._id ? ObjectIdGuard(user._id) : {};
});
