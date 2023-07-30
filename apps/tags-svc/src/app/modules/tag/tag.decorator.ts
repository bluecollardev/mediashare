import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ApiControllerDecoratorParams } from '@mediashare/shared';
import { Tag } from './entities/tag.entity';

export function TagGetResponse({ type = Tag, isArray = false, description }: ApiControllerDecoratorParams = {}) {
  return applyDecorators(ApiResponse({ type, isArray, description, status: 200 }), UseJwtGuard());
}

export function TagPostResponse({ type = Tag, isArray = false, description }: ApiControllerDecoratorParams = {}) {
  return applyDecorators(ApiResponse({ type, isArray, description, status: 201 }), UseJwtGuard());
}
