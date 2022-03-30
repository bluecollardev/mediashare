import { ApiControllerDecoratorParams } from '@mediashare/shared';
import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { UseJwtGuard } from '@api-modules/auth/auth.decorator';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PlaylistResponseDto } from './dto/playlist-response.dto';
import { Playlist } from './entities/playlist.entity';

export function PlaylistGetResponse({ isArray = false, type = PlaylistResponseDto }: ApiControllerDecoratorParams = {}) {
  return applyDecorators(ApiResponse({ type, isArray, status: 200 }), UseJwtGuard());
}

export function PlaylistPostResponse({ isArray = false, type = Playlist, description }: ApiControllerDecoratorParams = {}) {
  return applyDecorators(ApiResponse({ description, type, status: 201, isArray }), ApiBody({ type: CreatePlaylistDto }), UseJwtGuard());
}

export function PlaylistPutResponse({ isArray = false, type = Playlist, description }: ApiControllerDecoratorParams = {}) {
  return applyDecorators(ApiResponse({ description, type, status: 200, isArray }), ApiBody({ type: UpdatePlaylistDto }), UseJwtGuard());
}
