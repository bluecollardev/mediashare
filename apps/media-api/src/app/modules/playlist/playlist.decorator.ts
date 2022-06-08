import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { UseJwtGuard } from '@api-modules/auth/auth.decorator';
import { ApiControllerDecoratorParams } from '@mediashare/shared';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PlaylistResponseDto } from './dto/playlist-response.dto';
import { Playlist } from './entities/playlist.entity';
import { ShareItem } from '@api-modules/share-item/entities/share-item.entity';

export function PlaylistGetResponse({ type = PlaylistResponseDto, isArray = false, description }: ApiControllerDecoratorParams = {}) {
  return applyDecorators(ApiResponse({ type, isArray, description, status: 200 }), UseJwtGuard());
}

export function PlaylistPostResponse({ type = Playlist, isArray = false, description }: ApiControllerDecoratorParams = {}) {
  return applyDecorators(ApiResponse({ type, isArray, description, status: 201 }), ApiBody({ type: CreatePlaylistDto }), UseJwtGuard());
}

export function PlaylistPutResponse({ type = Playlist, isArray = false, description }: ApiControllerDecoratorParams = {}) {
  return applyDecorators(ApiResponse({ type, isArray, description, status: 200 }), ApiBody({ type: UpdatePlaylistDto }), UseJwtGuard());
}

export function PlaylistShareResponse({ type = ShareItem, isArray = false, description }: ApiControllerDecoratorParams = {}) {
  return applyDecorators(ApiResponse({ type, isArray, description, status: 201 }), UseJwtGuard());
}
