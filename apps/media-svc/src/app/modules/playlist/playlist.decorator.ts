import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { ApiControllerDecoratorParams } from '@mediashare/shared';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PlaylistDto } from './dto/playlist.dto';
import { Playlist } from './entities/playlist.entity';

export function PlaylistGetResponse({
  type = PlaylistDto,
  isArray = false,
  description,
}: ApiControllerDecoratorParams = {}) {
  // TODO: Fix auth!
  // return applyDecorators(ApiResponse({ type, isArray, description, status: 200 }), UseJwtGuard());
  return applyDecorators(
    ApiResponse({ type, isArray, description, status: 200 })
  );
}

export function PlaylistPostResponse({
  type = Playlist,
  isArray = false,
  description,
}: ApiControllerDecoratorParams = {}) {
  // TODO: Fix auth!
  // return applyDecorators(ApiResponse({ type, isArray, description, status: 201 }), ApiBody({ type: CreatePlaylistDto }), UseJwtGuard());
  return applyDecorators(
    ApiResponse({ type, isArray, description, status: 201 }),
    ApiBody({ type: CreatePlaylistDto })
  );
}

export function PlaylistPutResponse({
  type = Playlist,
  isArray = false,
  description,
}: ApiControllerDecoratorParams = {}) {
  // TODO: Fix auth!
  // return applyDecorators(ApiResponse({ type, isArray, description, status: 200 }), ApiBody({ type: UpdatePlaylistDto }), UseJwtGuard());
  return applyDecorators(
    ApiResponse({ type, isArray, description, status: 200 }),
    ApiBody({ type: UpdatePlaylistDto })
  );
}
