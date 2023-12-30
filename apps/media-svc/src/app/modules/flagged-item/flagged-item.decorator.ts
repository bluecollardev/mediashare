import { ApiControllerDecoratorParams } from '@mediashare/shared';
import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { FlaggedItem } from './entities/flagged-item.entity';

export function FlaggedItemGetResponse({
  type = FlaggedItem,
  isArray = false,
  description,
}: ApiControllerDecoratorParams = {}) {
  // TODO: Fix auth!
  // return applyDecorators(ApiResponse({ type, isArray, description, status: 200 }), UseJwtGuard());
  return applyDecorators(
    ApiResponse({ type, isArray, description, status: 200 })
  );
}

export function FlaggedItemPostResponse({
  type = FlaggedItem,
  isArray = false,
  description,
}: ApiControllerDecoratorParams = {}) {
  // TODO: Fix auth!
  // return applyDecorators(ApiResponse({ type, isArray, description, status: 201 }), UseJwtGuard());
  return applyDecorators(
    ApiResponse({ type, isArray, description, status: 201 })
  );
}
