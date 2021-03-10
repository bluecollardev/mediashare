import { createAction, PayloadActionCreator } from '@reduxjs/toolkit';

import { snakeCaseToCamelCase, SnakeCaseToCamelCase } from './utils';

export const makeEnum = <T extends string>(actions: readonly T[]): Record<SnakeCaseToCamelCase<T>, T> =>
  actions.reduce((prev, curr) => ({ ...prev, [snakeCaseToCamelCase(curr)]: curr }), Object.create({}));

export const makeActions = <T extends string>(actions: readonly T[]): Record<SnakeCaseToCamelCase<T>, PayloadActionCreator> =>
  actions.reduce((prev, curr) => ({ ...prev, [snakeCaseToCamelCase(curr)]: createAction(curr) }), Object.create({}));
