import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { ApiControllerDecoratorParams } from '@mediashare/shared';
import { CreateMediaItemDto } from './dto/create-media-item.dto';
import { UpdateMediaItemDto } from './dto/update-media-item.dto';
import { MediaItemResponseDto } from './dto/media-item-response.dto';
import { MediaItem } from './entities/media-item.entity';
import { ShareItem } from '../share-item/entities/share-item.entity';

export function MediaGetResponse({ type = MediaItemResponseDto, isArray = false, description }: ApiControllerDecoratorParams = {}) {
  // TODO: Fix auth!
  // return applyDecorators(ApiResponse({ type, isArray, description, status: 200 }), UseJwtGuard());
  return applyDecorators(ApiResponse({ type, isArray, description, status: 200 }));
}

export function MediaPostResponse({ type = MediaItem, isArray = false, description }: ApiControllerDecoratorParams = {}) {
  // TODO: Fix auth!
  // return applyDecorators(ApiResponse({ type, isArray, description, status: 201 }), ApiBody({ type: CreateMediaItemDto }), UseJwtGuard());
  return applyDecorators(ApiResponse({ type, isArray, description, status: 201 }), ApiBody({ type: CreateMediaItemDto }));
}

export function MediaPutResponse({ type = MediaItem, isArray = false, description }: ApiControllerDecoratorParams = {}) {
  // TODO: Fix auth!
  // return applyDecorators(ApiResponse({ type, isArray, description, status: 200 }), ApiBody({ type: UpdateMediaItemDto }), UseJwtGuard());
  return applyDecorators(ApiResponse({ type, isArray, description, status: 200 }), ApiBody({ type: UpdateMediaItemDto }));
}

export function MediaShareResponse({ type = ShareItem, isArray = false, description }: ApiControllerDecoratorParams = {}) {
  // TODO: Fix auth!
  // return applyDecorators(ApiResponse({ type, isArray, description, status: 201 }), UseJwtGuard());
  return applyDecorators(ApiResponse({ type, isArray, description, status: 201 }));
}
