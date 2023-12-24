import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { ApiControllerDecoratorParams } from '@mediashare/shared';
import { CreatePlaylistItemDto } from './dto/create-playlist-item.dto';
import { UpdatePlaylistItemDto } from './dto/update-playlist-item.dto';
import { PlaylistItemDto } from './dto/playlist-item.dto';
import { PlaylistItem } from './entities/playlist-item.entity';

export function PlaylistItemGetResponse({
  type = PlaylistItemDto,
  isArray = false,
  description,
}: ApiControllerDecoratorParams = {}) {
  // TODO: Fix auth!
  // return applyDecorators(ApiResponse({ type, isArray, description, status: 200 }), UseJwtGuard());
  return applyDecorators(
    ApiResponse({ type, isArray, description, status: 200 })
  );
}

export function PlaylistItemPostResponse({
  type = PlaylistItem,
  isArray = false,
  description,
}: ApiControllerDecoratorParams = {}) {
  // TODO: Fix auth!
  // return applyDecorators(ApiResponse({ type, isArray, description, status: 201 }), ApiBody({ type: CreatePlaylistItemDto }), UseJwtGuard());
  return applyDecorators(
    ApiResponse({ type, isArray, description, status: 201 }),
    ApiBody({ type: CreatePlaylistItemDto })
  );
}

export function PlaylistItemPutResponse({
  type = PlaylistItem,
  isArray = false,
  description,
}: ApiControllerDecoratorParams = {}) {
  // TODO: Fix auth!
  // return applyDecorators(ApiResponse({ type, isArray, description, status: 200 }), ApiBody({ type: UpdatePlaylistItemDto }), UseJwtGuard());
  return applyDecorators(
    ApiResponse({ type, isArray, description, status: 200 }),
    ApiBody({ type: UpdatePlaylistItemDto })
  );
}
