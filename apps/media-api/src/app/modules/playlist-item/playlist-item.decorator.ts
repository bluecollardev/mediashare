import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { UseJwtGuard } from '@api-modules/auth/auth.decorator';
import { ApiControllerDecoratorParams } from '@mediashare/shared';
import { CreatePlaylistItemDto } from './dto/create-playlist-item.dto';
import { UpdatePlaylistItemDto } from './dto/update-playlist-item.dto';
import { PlaylistItemResponseDto } from './dto/playlist-item-response.dto';
import { PlaylistItem } from './entities/playlist-item.entity';
import { ShareItem } from '@api-modules/share-item/entities/share-item.entity';

export function PlaylistItemGetResponse({ type = PlaylistItemResponseDto, isArray = false, description }: ApiControllerDecoratorParams = {}) {
  return applyDecorators(ApiResponse({ type, isArray, description, status: 200 }), UseJwtGuard());
}

export function PlaylistItemPostResponse({ type = PlaylistItem, isArray = false, description }: ApiControllerDecoratorParams = {}) {
  return applyDecorators(ApiResponse({ type, isArray, description, status: 201 }), ApiBody({ type: CreatePlaylistItemDto }), UseJwtGuard());
}

export function PlaylistItemPutResponse({ type = PlaylistItem, isArray = false, description }: ApiControllerDecoratorParams = {}) {
  return applyDecorators(ApiResponse({ type, isArray, description, status: 200 }), ApiBody({ type: UpdatePlaylistItemDto }), UseJwtGuard());
}

export function PlaylistItemShareResponse({ type = ShareItem, isArray = false, description }: ApiControllerDecoratorParams = {}) {
  return applyDecorators(ApiResponse({ type, isArray, description, status: 201 }), UseJwtGuard());
}
