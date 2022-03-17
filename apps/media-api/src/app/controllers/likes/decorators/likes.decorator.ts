import { ApiControllerDecoratorParams } from '@mediashare/shared';
import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { UseJwtGuard } from '@api-modules/auth/auth.decorator';
import { Like } from '../entities/like.entity';
const LikeResponse = function ({ isArray = false, type = Like, description }: ApiControllerDecoratorParams = {}) {
  return applyDecorators(ApiResponse({ description, type, status: 201, isArray }), UseJwtGuard());
};

export { LikeResponse };
