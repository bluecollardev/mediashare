import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ObjectId } from 'mongodb';

export const GetUser = createParamDecorator((data, context: ExecutionContext) => {
  const ctx = context.switchToHttp().getRequest();
  const user = ctx.session?.passport?.user ?? null;
  return user ? { ...user, _id: new ObjectId(user._id) } : {};
});
