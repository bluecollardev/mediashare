import { ApiControllerDecoratorParams } from '@mediashare/shared';
import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { UseJwtGuard } from '../../modules/auth/auth.decorator';
import { ShareItem } from '../../modules/share-item/entities/share-item.entity';

function TagPostResponse({ isArray = false, type = ShareItem, description }: ApiControllerDecoratorParams = {}) {
  return applyDecorators(ApiResponse({ description, type, status: 201, isArray }), UseJwtGuard());
}

function TagGetResponse({ isArray = false, type = ShareItem }: ApiControllerDecoratorParams = {}) {
  return applyDecorators(ApiResponse({ type, isArray, status: 200 }), UseJwtGuard());
}

export { TagPostResponse, TagGetResponse };
