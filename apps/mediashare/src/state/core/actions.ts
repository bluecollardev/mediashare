import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import * as types  from './types';
import {IListItem} from "./state";

/**
 * Just a generator for local development.
 */
function _getListItems () {
    const count = 5
    const newItems: IListItem[] = []
    for (let idx = 0; idx < count; idx++) {
        newItems.push({
            id: `item_${idx}`,
            description: 'Testing testing 123',
            order: idx
        } as IListItem)
    }
    return newItems
}

export type ListItemActions =
    | types.IGetListItemsAction
    | types.ILoadListItemsAction
    | types.IAddListItemAction
    | types.IUpdateListItemAction
    | types.ICreateListItemsAction
    | types.IRemoveListItemAction
    | types.IReorderListItemAction
    | types.IResetListItemsAction

export const getListItems: ActionCreator<
    ThunkAction<
        Promise<types.ILoadListItemsAction>, any, null, types.ILoadListItemsAction>
    > = () => {
  return async (dispatch: Dispatch) => {
    const getListItemsAction: types.IGetListItemsAction = {
        type: types.GET_ITEMS,
    } as types.IGetListItemsAction;


    dispatch(getListItemsAction);

    const listItems = await _getListItems();
    const loadListItemsAction: types.ILoadListItemsAction = {
        type: types.LOAD_ITEMS,
        items: listItems
    } as types.ILoadListItemsAction;

    const results = dispatch(loadListItemsAction);
    return results;
  };
};

export const addListItem: ActionCreator<
    ThunkAction<
        Promise<types.IAddListItemAction>, any, null, types.IAddListItemAction>
    > = (item) => {
  return async (dispatch: Dispatch) => {
    const addListItemAction: types.IAddListItemAction = {
        type: types.ADD_ITEM,
        item: item
    } as types.IAddListItemAction;

    return dispatch(addListItemAction);
  };
};

export const updateListItem: ActionCreator<
    ThunkAction<
        Promise<types.IUpdateListItemAction>, any, null, types.IUpdateListItemAction>
    > = (item) => {
    return async (dispatch: Dispatch) => {
        const updateListItemAction: types.IUpdateListItemAction = {
            type: types.UPDATE_ITEM,
            item: item
        } as types.IUpdateListItemAction;

        return dispatch(updateListItemAction);
    };
};

export const createListItems: ActionCreator<
    ThunkAction<
        Promise<types.ICreateListItemsAction>, any, null, types.ICreateListItemsAction>
    > = (count) => {
    return async (dispatch: Dispatch) => {
        const createListItemsAction: types.ICreateListItemsAction = {
            type: types.CREATE_ITEMS,
            count: count,
        } as types.ICreateListItemsAction;

        return dispatch(createListItemsAction);
    };
};

export const removeListItem: ActionCreator<
    ThunkAction<
        Promise<types.IRemoveListItemAction>, any, null, types.IRemoveListItemAction>
    > = (key) => {
  return async (dispatch: Dispatch) => {
    const removeListItemAction: types.IRemoveListItemAction = {
        type: types.REMOVE_ITEM,
        key: key
    } as types.IRemoveListItemAction;

    return dispatch(removeListItemAction);
  };
};


export const reorderListItem: ActionCreator<
    ThunkAction<
        Promise<types.IReorderListItemAction>, any, null, types.IReorderListItemAction>
    > = ({ key, order }) => {
  return async (dispatch: Dispatch) => {
    const reorderListItemAction: types.IReorderListItemAction = {
        type: types.REORDER_ITEM,
        key: key,
        order: order,
    } as types.IReorderListItemAction;

    return dispatch(reorderListItemAction);
  };
};

export const resetListItems: ActionCreator<
    ThunkAction<
        Promise<types.IResetListItemsAction>, any, null, types.IResetListItemsAction>
    > = () => {
    return async (dispatch: Dispatch) => {
        const resetListItemsAction: types.IResetListItemsAction = {
            type: types.RESET_LIST,
        } as types.IResetListItemsAction;

        return dispatch(resetListItemsAction);
    };
};
