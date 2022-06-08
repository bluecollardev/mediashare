import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { UseJwtGuard } from '@api-modules/auth/auth.decorator';
import { ApiControllerDecoratorParams } from '@mediashare/shared';
import { CreateMediaItemDto } from './dto/create-media-item.dto';
import { UpdateMediaItemDto } from './dto/update-media-item.dto';
import { MediaItemResponseDto } from './dto/media-item-response.dto';
import { MediaItem } from './entities/media-item.entity';
import { ShareItem } from '@api-modules/share-item/entities/share-item.entity';

export function MediaGetResponse({ type = MediaItemResponseDto, isArray = false, description }: ApiControllerDecoratorParams = {}) {
  return applyDecorators(ApiResponse({ type, isArray, description, status: 200 }), UseJwtGuard());
}

export function MediaPostResponse({ type = MediaItem, isArray = false, description }: ApiControllerDecoratorParams = {}) {
  return applyDecorators(ApiResponse({ type, isArray, description, status: 201 }), ApiBody({ type: CreateMediaItemDto }), UseJwtGuard());
}

export function MediaPutResponse({ type = MediaItem, isArray = false, description }: ApiControllerDecoratorParams = {}) {
  return applyDecorators(ApiResponse({ type, isArray, description, status: 200 }), ApiBody({ type: UpdateMediaItemDto }), UseJwtGuard());
}

export function MediaShareResponse({ type = ShareItem, isArray = false, description }: ApiControllerDecoratorParams = {}) {
  return applyDecorators(ApiResponse({ type, isArray, description, status: 201 }), UseJwtGuard());
}
