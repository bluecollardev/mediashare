import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { ApiControllerDecoratorParams } from '@mediashare/shared';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PlaylistResponseDto } from './dto/playlist-response.dto';
import { Playlist } from './entities/playlist.entity';
import { ShareItem } from '../share-item/entities/share-item.entity';

export function PlaylistGetResponse({ type = PlaylistResponseDto, isArray = false, description }: ApiControllerDecoratorParams = {}) {
  // TODO: Fix auth!
  // return applyDecorators(ApiResponse({ type, isArray, description, status: 200 }), UseJwtGuard());
  return applyDecorators(ApiResponse({ type, isArray, description, status: 200 }));
}

export function PlaylistPostResponse({ type = Playlist, isArray = false, description }: ApiControllerDecoratorParams = {}) {
  // TODO: Fix auth!
  // return applyDecorators(ApiResponse({ type, isArray, description, status: 201 }), ApiBody({ type: CreatePlaylistDto }), UseJwtGuard());
  return applyDecorators(ApiResponse({ type, isArray, description, status: 201 }), ApiBody({ type: CreatePlaylistDto }));
}

export function PlaylistPutResponse({ type = Playlist, isArray = false, description }: ApiControllerDecoratorParams = {}) {
  // TODO: Fix auth!
  // return applyDecorators(ApiResponse({ type, isArray, description, status: 200 }), ApiBody({ type: UpdatePlaylistDto }), UseJwtGuard());
  return applyDecorators(ApiResponse({ type, isArray, description, status: 200 }), ApiBody({ type: UpdatePlaylistDto }));
}

export function PlaylistShareResponse({ type = ShareItem, isArray = false, description }: ApiControllerDecoratorParams = {}) {
  // TODO: Fix auth!
  // return applyDecorators(ApiResponse({ type, isArray, description, status: 201 }), UseJwtGuard());
  return applyDecorators(ApiResponse({ type, isArray, description, status: 201 }));
}
