/* eslint-disable no-undef */
import * as R from 'remeda';
import { RootState } from 'mediashare/store';

export type SnakeCaseToCamelCase<S extends string> = S extends `${infer FirstWord}_${infer Rest}`
  ? `${Lowercase<FirstWord>}${SnakeCaseToPascalCase<Rest>}`
  : `${Lowercase<S>}`;

export type SnakeCaseToPascalCase<S extends string> = S extends `${infer FirstWord}_${infer Rest}`
  ? `${Capitalize<Lowercase<FirstWord>>}${SnakeCaseToPascalCase<Rest>}`
  : Capitalize<Lowercase<S>>;

export function snakeCaseToCamelCase<S extends string>(snakeCaseString: S): SnakeCaseToCamelCase<S> | undefined {
  if (!snakeCaseString) {
    return;
  }
  return snakeCaseString
    .split('_')
    .map((word, i) => (i === 0 ? word.toLowerCase() : word && word[0].toUpperCase() + word.slice(1).toLowerCase()))
    .join('') as SnakeCaseToCamelCase<S>;
}

export const cloneState = (state: RootState): RootState => R.clone<RootState>(state);
export const mergeState =
  (state: RootState) =>
  <T>(item: T) =>
    R.merge(cloneState(state), R.clone(item));
