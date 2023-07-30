import { ApiPropertyOptions } from '@nestjs/swagger';
import { ValidationOptions } from 'class-validator';

export type OptionalApiDecoratorOptions = Pick<
  ApiPropertyOptions & ValidationOptions,
  'enum' | 'readOnly' | 'example' | 'description'
>;

export type RequiredApiDecoratorOptions = Pick<ApiPropertyOptions & ValidationOptions, 'required' | 'type'>;

export type ApiDecoratorOptions = RequiredApiDecoratorOptions & OptionalApiDecoratorOptions;
