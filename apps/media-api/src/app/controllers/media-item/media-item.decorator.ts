import { ApiControllerDecoratorParams } from '@mediashare/shared';
import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { UseJwtGuard } from '@api-modules/auth/auth.decorator';
import { CreateMediaItemDto } from './dto/create-media-item.dto';
import { UpdateMediaItemDto } from './dto/update-media-item.dto';
import { MediaItemResponseDto } from './dto/media-item-response.dto';
import { MediaItem } from './entities/media-item.entity';

export function MediaGetResponse({ isArray = false, type = MediaItemResponseDto }: ApiControllerDecoratorParams = {}) {
  return applyDecorators(ApiResponse({ type, isArray, status: 200 }), UseJwtGuard());
}

export function MediaPostResponse({ isArray = false, type = MediaItem, description }: ApiControllerDecoratorParams = {}) {
  return applyDecorators(ApiResponse({ description, type, status: 201, isArray }), ApiBody({ type: CreateMediaItemDto }), UseJwtGuard());
}

export function MediaPutResponse({ isArray = false, type = MediaItem, description }: ApiControllerDecoratorParams = {}) {
  return applyDecorators(ApiResponse({ description, type, status: 200, isArray }), ApiBody({ type: UpdateMediaItemDto }), UseJwtGuard());
}
