import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ApiControllerDecoratorParams } from '@mediashare/shared';
import { ViewItem } from './entities/view-item.entity';

export function ViewsPostResponse({ type = ViewItem, isArray = false, description }: ApiControllerDecoratorParams = {}) {
  // TODO: Fix auth!
  // return applyDecorators(ApiResponse({ type, isArray, description, status: 201 }), UseJwtGuard());
  return applyDecorators(ApiResponse({ type, isArray, description, status: 201 }));
}
