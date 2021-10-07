import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

@Injectable()
export class CreatedBy implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): any {
    const ctx = context.switchToHttp().getRequest();
    const { _id } = ctx.session?.passport?.user ?? null;
    ctx.body = { ...ctx.body, createdBy: _id };

    return next.handle();
  }
}
