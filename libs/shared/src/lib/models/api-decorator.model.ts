import { applyDecorators } from '@nestjs/common';

export type ApiDecoratorType = (opts?: { required?: boolean }) => ReturnType<typeof applyDecorators>;
