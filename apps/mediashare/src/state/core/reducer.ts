import { RootState } from '..';
import { snakeCaseToCamelCase, SnakeCaseToCamelCase } from './types';
import * as R from 'remeda';
import { Reducer } from 'redux';
import { PayloadAction } from '@reduxjs/toolkit';
export const ReducerFactory = function <T extends string>(
  reducerDict: Record<T[number], (...args) => RootState>
): Reducer {
  const reducer = function (state: RootState, action: { type: T }) {
    const { type } = action;
    if (!type) return state;
    console.log(state, action);
    return reducerDict[snakeCaseToCamelCase(type)];
  };

  return reducer;
};

export type ReducerDictionary<T extends string> = Record<SnakeCaseToCamelCase<T>, (...args) => RootState>;

export const cloneState = (state: RootState): RootState => R.clone<RootState>(state);

export const mergeState = (state: RootState) => <T>(item: T) => R.merge(cloneState(state), R.clone(item));
export const getItem = <T>(state: RootState, action: PayloadAction<T>) => ({ ...state, ...action.payload });
export const getItems = <T>(state: RootState, action: PayloadAction<T>) => ({ ...state, ...action.payload });

export const loadItems = <T>(state: RootState, action: PayloadAction<T>) => ({
  ...state,
  // items: action.items,
  // loading: false,);
});
export const updateItems = <T>(state: RootState, action: PayloadAction<T>) => {
  // const items = state.items;
  // if (!action.item.id) return { ...state }; // We could throw an error here...
  // const item = items.find((item) => item.id === action.item.id);
  // if (!item) return { ...state }; // We could throw an error here...
  // const stateItems = [...items];
  // stateItems.splice(items.indexOf(item), 1, action.item);
  // return {
  //   ...state,
  //   // posting: true,
  //   items: stateItems,
  // };
};

export const updateItems = <T>(state: RootState, action: PayloadAction<T>) => {
  // const items = state.items;
  // if (!action.key) return { ...state }; // We could throw an error here...
  // const item = items.find((item) => item.id === action.key);
  // if (!item) return { ...state }; // We could throw an error here...
  // const stateItems = [...items];
  // stateItems.splice(items.indexOf(item), 1);
  // return {
  //   ...state,
  //   // posting: true,
  //   items: stateItems,
  // };
};

export const loadItems = <T>(state: RootState, action: PayloadAction<T>) => {
  // const items = state.items;
  // if (!action.key) return { ...state }; // We could throw an error here...
  // const item = items.find((item) => item.id === action.key);
  // if (!item) return { ...state }; // We could throw an error here...
  // const stateItems = [...items];
  // stateItems.splice(items.indexOf(item), 1);
  // return {
  //   ...state,
  //   // posting: true,
  //   items: stateItems,
  // };
};

export const addItem = <T>(state: RootState, action: PayloadAction<T>) => {
  // const items: IListItem[] = state.items;
  // const createCount = action.count;
  // const startIndex = items.length > 0 ? Math.max(...items.map((item) => item.order)) + 1 : 0;
  // const maxIndex = startIndex + createCount;
  // const newItems: IListItem[] = [];
  // for (let idx = startIndex; idx < maxIndex; idx++) {
  //   newItems.push({
  //     id: `item_${idx}`,
  //     description: '',
  //     order: idx,
  //   } as IListItem);
  // }
  // const stateItems = items.concat(newItems);
  // return {
  //   ...state,
  //   // posting: true,
  //   items: stateItems,
  // };
};

export const addItems = <T>(state: RootState, action: PayloadAction<T>) => {
  // const items = state.items;
  // const stateItems = items.concat([action.item]);
  return {
    ...state,
    // posting: true,
    // items: stateItems,
  };
};

export const removeItem = <T>(state: RootState, action: PayloadAction<T>) => {
  // const items = state.items;
  // if (!action.key) return { ...state }; // We could throw an error here...
  // const item = items.find((item) => item.id === action.key);
  // if (!item) return { ...state }; // We could throw an error here...
  // const stateItems = [...items];
  // stateItems.splice(items.indexOf(item), 1);
  // return {
  //   ...state,
  //   // posting: true,
  //   items: stateItems,
  // };
};

export const reorderList = <T>(state: RootState, action: PayloadAction<T>) => ({
  ...state,
});

export const resetListList = <T>(state: RootState, action: PayloadAction<T>) => ({
  ...state,
  items: [],
});
