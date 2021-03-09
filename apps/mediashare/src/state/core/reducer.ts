import { Reducer } from 'redux';

import * as types from './types';
import { ListItemActions } from './actions';
import { IListItem, IListItemsState, initialListItemsState } from './state';

export const listItemsReducer: Reducer<
  IListItemsState,
  ListItemActions
> = (state = initialListItemsState, action) => {
  switch (action.type) {
    case types.GET_ITEMS: {
      return {
        ...state,
        // loading: true,
      };
    }
    case types.LOAD_ITEMS: {
      return {
        ...state,
        items: action.items,
        // loading: false,
      };
    }
    case types.ADD_ITEM: {
      const items = state.items;
      const stateItems = items.concat([action.item]);
      return {
        ...state,
        // posting: true,
        items: stateItems
      };
    }
    case types.UPDATE_ITEM: {
      const items = state.items;
      if (!action.item.id) return { ...state }; // We could throw an error here...
      const item = items.find(item => item.id === action.item.id)
      if (!item) return { ...state }; // We could throw an error here...
      const stateItems = [...items]
      stateItems.splice(items.indexOf(item), 1, action.item)
      return {
        ...state,
        // posting: true,
        items: stateItems
      };
    }
    case types.CREATE_ITEMS: {
      const items: IListItem[] = state.items;
      const createCount = action.count;
      const startIndex = (items.length > 0) ? Math.max(...items
          .map(item => item.order)) + 1 : 0;
      const maxIndex = startIndex + createCount;

      const newItems: IListItem[] = [];

      for (let idx = startIndex; idx < maxIndex; idx++) {
        newItems.push({
          id: `item_${idx}`,
          description: '',
          order: idx
        } as IListItem);
      }
      const stateItems = items.concat(newItems);
      return {
        ...state,
        // posting: true,
        items: stateItems
      };
    }
    case types.REMOVE_ITEM: {
      const items = state.items;
      if (!action.key) return { ...state }; // We could throw an error here...
      const item = items.find(item => item.id === action.key)
      if (!item) return { ...state }; // We could throw an error here...
      const stateItems = [...items]
      stateItems.splice(items.indexOf(item), 1)
      return {
        ...state,
        // posting: true,
        items: stateItems
      };
    }
    case types.REORDER_ITEM: {
      return {
        ...state
      };
    }
    case types.RESET_LIST: {
      return {
        ...state,
        items: []
      };
    }
    default:
      // @ts-ignore
      neverReached(action); // when a new action is created, this helps us remember to handle it in the reducer
  }
  return state;
};

// tslint:disable-next-line:no-empty
const neverReached = (never: never) => {};
