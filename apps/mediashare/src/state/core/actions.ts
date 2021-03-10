/* eslint-disable no-undef */
import { RootState } from '..';
import { SnakeCaseToCamelCase, snakeCaseToCamelCase } from './utils';

export const ACTION_TYPES = ['ADD', 'REMOVE', 'GET', 'FIND'] as const;

const CreateActionFactory = (type: string) => <T>(payload: T = null) => ({
  type,
  ...payloadFactory(payload),
});

const payloadFactory = <T>(payload: T) => ({
  payload,
});

function makeActions<T extends string>(actionKeys: readonly T[]) {
  const baseActionsFactory = CreateActionFactory;

  // eslint-disable-next-line no-undef
  const actions: Record<SnakeCaseToCamelCase<T>, ReturnType<typeof CreateActionFactory>> = actionKeys.reduce(
    (prev, curr) => ({ ...prev, [snakeCaseToCamelCase(curr)]: baseActionsFactory(curr) }),
    Object.create({})
  );

  return actions;
}

export function getItems<T>(state: RootState, item: T): RootState {
  return { ...state, ...item };
}

export { makeActions };
