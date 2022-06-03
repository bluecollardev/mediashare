import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { UseJwtGuard } from '@api-modules/auth/auth.decorator';
import { ApiControllerDecoratorParams } from '@mediashare/shared';
import { ViewItem } from './entities/view-item.entity';

export function ViewsPostResponse({ type = ViewItem, isArray = false, description }: ApiControllerDecoratorParams = {}) {
  return applyDecorators(ApiResponse({ type, isArray, description, status: 201 }), UseJwtGuard());
}
