import { ApiControllerDecoratorParams } from '@mediashare/shared';
import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { UseJwtGuard } from '@api-modules/auth/auth.decorator';
import { ShareItem } from '@api-modules/share-item/entities/share-item.entity';

export function ShareItemGetResponse({ isArray = false, type = ShareItem }: ApiControllerDecoratorParams = {}) {
  return applyDecorators(ApiResponse({ type, isArray, status: 200 }), UseJwtGuard());
}

export function ShareItemPostResponse({ isArray = false, type = ShareItem, description }: ApiControllerDecoratorParams = {}) {
  return applyDecorators(ApiResponse({ description, type, status: 201, isArray }), UseJwtGuard());
}
