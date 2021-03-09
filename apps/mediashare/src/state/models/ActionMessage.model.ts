import { Action, Reducer } from 'redux';
import { RootState } from '..';
import { UserApi } from '../../api';

type ApiTypes = UserApi;

type ApiKeys = keyof ApiTypes;

// const [LOGIN] = ['LOGIN'] as const;

const actions = ['LOGIN'] as const;

type ActionsType = typeof actions[number];

type ActionDictType = Record<typeof actions[number], ActionsType>;

export type ApiActionDictType = Record<StateActionType, ApiKeys>;

const Actions: ActionDictType = actions.reduce((prev, curr) => ({ ...prev, [curr]: curr }), Object.create({}));

export type StateActionValueType<T extends ActionsType> = T extends keyof ActionDictType ? ActionsType : never;

export type StateActionType = StateActionValueType<keyof typeof Actions>;

export interface StateAction<T> extends Action {
  type: StateActionType;
  payload: T;
}

export interface ReducerMessage extends Reducer {
  action: StateAction<Object>;
  state: RootState;
}

export type AppReducerType = (message: ReducerMessage) => RootState;

export { Actions };
