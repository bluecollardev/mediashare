import { applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiResponseMetadata } from '@nestjs/swagger';

type ApiControllerDecoratorOptions = Pick<ApiResponseMetadata, 'type' | 'status' | 'isArray' | 'description'>;

export type ApiControllerDecoratorParams = Partial<ApiControllerDecoratorOptions>;

const ApiGetResponse = function ({ type, isArray }: ApiControllerDecoratorParams = {}) {
  return applyDecorators(ApiResponse({ type, status: 200, isArray }));
};

const ApiPostResponse = function ({ type, isArray }: ApiControllerDecoratorParams = {}) {
  return applyDecorators(ApiResponse({ type, status: 201, isArray }));
};

export { ApiGetResponse, ApiPostResponse };
