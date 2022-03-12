import { applyDecorators } from '@nestjs/common';
import { ApiResponseOptions } from '@nestjs/swagger';

type ApiResponseOptionsType = Pick<ApiResponseOptions, 'description' | 'content' | 'status'>;

export type BcApiResponseOptions = Partial<ApiResponseOptionsType>;

export type ApiResponseDecoratorType = (opts?: BcApiResponseOptions) => ReturnType<typeof applyDecorators>;
