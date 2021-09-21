import { ApiControllerDecoratorParams } from '@mediashare/shared';
import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { UseJwtGuard } from '../../modules/auth/auth.decorator';
import { Playlist } from './entities/playlist.entity';

function PlaylistPostResponse({ isArray = false, type = Playlist, description }: ApiControllerDecoratorParams = {}) {
  return applyDecorators(ApiResponse({ description, type, status: 201, isArray }), UseJwtGuard());
}

const PlaylistGetResponse = function ({ isArray = false, type = Playlist }: ApiControllerDecoratorParams = {}) {
  return applyDecorators(ApiResponse({ type, isArray, status: 200 }), UseJwtGuard());
};

function PlaylistPutResponse({ isArray = false, type = Playlist, description }: ApiControllerDecoratorParams = {}) {
  return applyDecorators(ApiResponse({ description, type, status: 200, isArray }), UseJwtGuard());
}

export { PlaylistPostResponse, PlaylistGetResponse, PlaylistPutResponse };
