import { ApiControllerDecoratorParams } from '@mediashare/shared';
import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Tag } from '@api-core/entities/tag.entity';
import { UseJwtGuard } from '@api-modules/auth/auth.decorator';

export function TagGetResponse({ isArray = false, type = Tag }: ApiControllerDecoratorParams = {}) {
  return applyDecorators(ApiResponse({ type, isArray, status: 200 }), UseJwtGuard());
}

export function TagPostResponse({ isArray = false, type = Tag, description }: ApiControllerDecoratorParams = {}) {
  return applyDecorators(ApiResponse({ description, type, status: 201, isArray }), UseJwtGuard());
}
