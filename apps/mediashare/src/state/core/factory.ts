import { createAction, PayloadActionCreator } from '@reduxjs/toolkit';

import { snakeCaseToCamelCase, SnakeCaseToCamelCase } from './utils';

type EnumRecordType<S extends readonly string[]> = { [P in S[number] as SnakeCaseToCamelCase<P>]: P };

export const makeEnum = <T extends readonly string[]>(actions: T): EnumRecordType<T> =>
  actions.reduce((prev, curr) => ({ ...prev, [snakeCaseToCamelCase(curr)]: curr }), Object.create({}));

export const makeActions = <T extends string>(actions: readonly T[]): Record<SnakeCaseToCamelCase<T>, PayloadActionCreator> =>
  actions.reduce((prev, curr) => ({ ...prev, [snakeCaseToCamelCase(curr)]: createAction<T>(curr) }), Object.create({}));
