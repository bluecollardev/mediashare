import { RootState } from '..';

const CreateActionFactory = (type: string) => <T>(payload: T = null) => ({
  type,
  ...payloadFactory(payload),
});

const payloadFactory = <T>(payload: T) => ({
  payload,
});

function makeActions<T extends string>(actionKeys: readonly T[]) {
  const baseActionsFactory = CreateActionFactory;

  const actions: Record<T, ReturnType<typeof CreateActionFactory>> = actionKeys.reduce(
    (prev, curr) => ({ ...prev, [curr]: baseActionsFactory(curr) }),
    Object.create({})
  );

  return actions;
}

export function getItems<T>(state: RootState, item: T): RootState {
  return { ...state, ...item };
}

export { makeActions };
