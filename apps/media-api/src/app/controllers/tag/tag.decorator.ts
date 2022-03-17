import { ApiControllerDecoratorParams } from '@mediashare/shared';
import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { UseJwtGuard } from '../../modules/auth/auth.decorator';
import { Tag } from '../../modules/tag/entities/tag.entity';

function TagPostResponse({ isArray = false, type = Tag, description }: ApiControllerDecoratorParams = {}) {
  return applyDecorators(ApiResponse({ description, type, status: 201, isArray }), UseJwtGuard());
}

function TagGetResponse({ isArray = false, type = Tag }: ApiControllerDecoratorParams = {}) {
  return applyDecorators(ApiResponse({ type, isArray, status: 200 }), UseJwtGuard());
}

export { TagPostResponse, TagGetResponse };
