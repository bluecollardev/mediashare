import { createAction, PayloadActionCreator } from '@reduxjs/toolkit';

import { snakeCaseToCamelCase, SnakeCaseToCamelCase } from './utils';

type EnumRecordType<S extends readonly string[]> = { [P in S[number] as SnakeCaseToCamelCase<P>]: P };

type ActionsType<S extends readonly string[], V> = { [P in S[number] as SnakeCaseToCamelCase<P>]: PayloadActionCreator<V, P> };
type ActionsTypeSc<S extends readonly string[], V> = { [P in S[number] as SnakeCaseToCamelCase<P>]: PayloadActionCreator<V, SnakeCaseToCamelCase<P>> };
export const makeEnum = <T extends readonly string[]>(actions: T): EnumRecordType<T> =>
  actions.reduce((prev, curr) => ({ ...prev, [snakeCaseToCamelCase(curr)]: curr }), Object.create({}));

export const makeActions = <T extends readonly string[], V>(actions: T): ActionsType<T, V> =>
  actions.reduce((prev, curr) => ({ ...prev, [snakeCaseToCamelCase(curr)]: createAction(curr) }), Object.create({}));

export const ActionsFactory = <T extends readonly string[], V>(actions: T, initialState: V): ActionsTypeSc<T, V> =>
  actions.reduce(
    (prev, curr) => ({
      ...prev,
      [snakeCaseToCamelCase(curr)]: createAction<V>(snakeCaseToCamelCase(curr)),
    }),
    Object.create({})
  );

export function withPayloadType<T>() {
  return (t: T) => ({ payload: t });
}
