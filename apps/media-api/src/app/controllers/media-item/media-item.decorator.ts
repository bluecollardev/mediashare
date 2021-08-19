import { ApiControllerDecoratorParams } from '@mediashare/shared';
import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { UseJwtGuard } from '../../modules/auth/auth.decorator';
import { CreateMediaItemDto } from './dto/create-media-item.dto';
import { MediaItem } from './entities/media-item.entity';

function MediaPostResponse({ isArray = false, type = MediaItem, description }: ApiControllerDecoratorParams = {}) {
  return applyDecorators(
    ApiResponse({ description, type, status: 201, isArray }),
    ApiBody({ type: CreateMediaItemDto })
    // UseJwtGuard()
  );
}

const MediaGetResponse = function ({ isArray = false, type = MediaItem }: ApiControllerDecoratorParams = {}) {
  return applyDecorators(
    ApiResponse({ type, isArray, status: 200 })
    // UseJwtGuard()
  );
};

export { MediaGetResponse, MediaPostResponse };
