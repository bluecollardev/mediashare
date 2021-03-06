import { applyDecorators, SetMetadata } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';
import { ObjectId } from 'mongodb';
import { apiDecoratorDefaults, ApiDecoratorOptions } from '../models';
const example = new ObjectId();

const ApiObjectId = function ({ required, readOnly, description }: ApiDecoratorOptions = apiDecoratorDefaults) {
  return applyDecorators(
    IsMongoId(),
    ApiProperty({ type: ObjectId, required, example: example, readOnly, description })
  );
};

export { ApiObjectId };
