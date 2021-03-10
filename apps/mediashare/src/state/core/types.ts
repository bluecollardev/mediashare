/* eslint-disable no-undef */
import { createAction } from '@reduxjs/toolkit';

// eslint-disable-next-line no-undef
export type SnakeCaseToCamelCase<S extends string> = S extends `${infer FirstWord}_${infer Rest}`
  ? `${Lowercase<FirstWord>}${SnakeCaseToPascalCase<Rest>}`
  : // eslint-disable-next-line no-undef
    `${Lowercase<S>}`;

export type SnakeCaseToPascalCase<S extends string> = S extends `${infer FirstWord}_${infer Rest}`
  ? // eslint-disable-next-line no-undef
    `${Capitalize<Lowercase<FirstWord>>}${SnakeCaseToPascalCase<Rest>}`
  : Capitalize<Lowercase<S>>;

export function snakeCaseToCamelCase<S extends string>(snakeCaseString: S): SnakeCaseToCamelCase<S> {
  if (!snakeCaseString) return;
  return snakeCaseString
    .split('_')
    .map((word, i) => (i === 0 ? word.toLowerCase() : word && word[0].toUpperCase() + word.slice(1).toLowerCase()))
    .join('') as SnakeCaseToCamelCase<S>;
}

export const makeEnum = <T extends string>(actions: readonly T[]): Record<SnakeCaseToCamelCase<T>, T> =>
  actions.reduce((prev, curr) => ({ ...prev, [snakeCaseToCamelCase(curr)]: curr }), Object.create({}));

export const makeActions = <T extends string>(actions: readonly T[]): Record<SnakeCaseToCamelCase<T>, T> =>
  actions.reduce((prev, curr) => ({ ...prev, [snakeCaseToCamelCase(curr)]: createAction(curr) }), Object.create({}));
