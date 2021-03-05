// @ApiProperty({ type: 'string' })

import { ApiDecoratorType } from '@mediashare/shared';
import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsUrl, Length } from 'class-validator';
import { apiDecoratorDefaults } from '../models';

const baseStringValidators = (min, max) => [IsString(), Length(min, max)];
const lengthFn = function (minLength: number, maxLength: number) {
  return { maxLength, minLength };
};

const ApiEmail: ApiDecoratorType = function ({ required } = apiDecoratorDefaults) {
  const length = [5, 50] as const;

  return applyDecorators(
    ApiProperty({ required, type: String, example: 'test@example.com', ...lengthFn(...length) }),
    IsEmail()
  );
};

const ApiUsername: ApiDecoratorType = function ({ required } = apiDecoratorDefaults) {
  return applyDecorators(ApiEmail({ required }));
};

const ApiName: ApiDecoratorType = function ({ required } = apiDecoratorDefaults) {
  const length = [5, 255] as const;

  return applyDecorators(
    ...baseStringValidators(5, 30),
    ApiProperty({ required, type: String, example: 'firstName', ...lengthFn(...length) })
  );
};

const ApiString: ApiDecoratorType = function ({ required } = apiDecoratorDefaults) {
  const length = [5, 255] as const;
  return applyDecorators(
    ...baseStringValidators(...length),
    ApiProperty({ required, type: String, examples: ['firstName', 'lastName'], ...lengthFn(...length) })
  );
};

const ApiUriString: ApiDecoratorType = function ({ required } = apiDecoratorDefaults) {
  const [min, max] = [5, 255] as const;
  return applyDecorators(
    IsUrl(),
    ApiProperty({
      required,
      type: String,
      examples: ['www.example.com', 'www.google.com'],
      maxLength: max,
      minLength: min,
    })
  );
};

const ApiLongString: ApiDecoratorType = function ({ required } = apiDecoratorDefaults) {
  return applyDecorators(
    ...baseStringValidators(5, 700),
    ApiProperty({ required, type: String, examples: ['firstName', 'lastName'] })
  );
};

export { ApiEmail, ApiUsername, ApiName, ApiString, ApiUriString, ApiLongString };
