/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
import { RootState } from '../index';
import * as R from 'remeda';

export type SnakeCaseToCamelCase<S extends string> = S extends `${infer FirstWord}_${infer Rest}`
  ? `${Lowercase<FirstWord>}${SnakeCaseToPascalCase<Rest>}`
  : // eslint-disable-next-line no-undef
    `${Lowercase<S>}`;

export type SnakeCaseToPascalCase<S extends string> = S extends `${infer FirstWord}_${infer Rest}`
  ? // eslint-disable-next-line no-undef
    `${Capitalize<Lowercase<FirstWord>>}${SnakeCaseToPascalCase<Rest>}`
  : Capitalize<Lowercase<S>>;

export function snakeCaseToCamelCase<S extends string>(snakeCaseString: S): SnakeCaseToCamelCase<S> {
  if (!snakeCaseString) {
    return;
  }
  return snakeCaseString
    .split('_')
    .map((word, i) => (i === 0 ? word.toLowerCase() : word && word[0].toUpperCase() + word.slice(1).toLowerCase()))
    .join('') as SnakeCaseToCamelCase<S>;
}

export const cloneState = (state: RootState): RootState => R.clone<RootState>(state);
export const mergeState = (state: RootState) => <T>(item: T) => R.merge(cloneState(state), R.clone(item));
