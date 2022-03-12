import { ApiControllerDecoratorParams } from '@mediashare/shared';
import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { UseJwtGuard } from '../../../modules/auth/auth.decorator';
import { ViewItem } from '../entities/view-item.entity';

const ViewsPostResponse = function ({ isArray = false, type = ViewItem, description }: ApiControllerDecoratorParams = {}) {
  return applyDecorators(ApiResponse({ description, type, status: 201, isArray }), UseJwtGuard());
};

export { ViewsPostResponse };
