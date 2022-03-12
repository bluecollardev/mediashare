/* eslint-disable no-undef */
import { RootState } from '../../store';
import { SnakeCaseToCamelCase, snakeCaseToCamelCase } from './utils';

export const ACTION_TYPES = ['ADD', 'REMOVE', 'GET', 'FIND'] as const;

const CreateActionFactory = (type: string) =>
  // @ts-ignore
  <T>(payload: T = null) => ({
    type,
    ...payloadFactory(payload),
  });

const payloadFactory = <T>(payload: T) => ({
  payload,
});

function makeActions<T extends string>(actionKeys: readonly T[]) {
  const baseActionsFactory = CreateActionFactory;

  const actions: Record<SnakeCaseToCamelCase<T>, ReturnType<typeof CreateActionFactory>> = actionKeys.reduce(
    (prev, curr) => ({
      ...prev,
      [snakeCaseToCamelCase(curr) as string]: baseActionsFactory(curr),
    }),
    Object.create({})
  );

  return actions;
}

export function getItems<T>(state: RootState, item: T): RootState {
  return { ...state, ...item };
}

export { makeActions };
