// @ApiProperty({ type: 'string' })

import { ApiDecoratorType } from '@mediashare/shared';
import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsUrl, Length } from 'class-validator';
import { apiDecoratorDefaults } from '../models';

const ApiEmail: ApiDecoratorType = function ({ required } = apiDecoratorDefaults) {
  return applyDecorators(ApiProperty({ required, type: String, example: 'test@example.com' }), IsEmail());
};

const ApiUsername: ApiDecoratorType = function ({ required } = apiDecoratorDefaults) {
  return applyDecorators(ApiEmail({ required: true }));
};

const baseStringValidators = (min, max) => [IsString(), Length(min, max)];

const ApiName: ApiDecoratorType = function ({ required } = apiDecoratorDefaults) {
  return applyDecorators(...baseStringValidators(5, 30), ApiProperty({ required, type: String, example: 'firstName' }));
};

const ApiString: ApiDecoratorType = function ({ required } = apiDecoratorDefaults) {
  return applyDecorators(
    ...baseStringValidators(5, 255),
    ApiProperty({ required, type: String, examples: ['firstName', 'lastName'] })
  );
};

const ApiUriString: ApiDecoratorType = function ({ required } = apiDecoratorDefaults) {
  return applyDecorators(
    IsUrl(),
    ApiProperty({ required, type: String, examples: ['www.example.com', 'www.google.com'] })
  );
};

export { ApiEmail, ApiUsername, ApiName, ApiString, ApiUriString };
