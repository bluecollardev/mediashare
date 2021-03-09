import { Action } from 'redux';
import { IListItem } from './state';

export const GET_ITEMS = 'getItems';
export const LOAD_ITEMS = 'loadItems';
export const ADD_ITEM = 'addItem';
export const UPDATE_ITEM = 'updateItem';
export const CREATE_ITEMS = 'createItems';
export const REMOVE_ITEM = 'removeItem';
export const REORDER_ITEM = 'reorderItem';
export const RESET_LIST = 'resetList';

export interface IGetListItemsAction extends Action {
    type: typeof GET_ITEMS
}

export interface ILoadListItemsAction extends Action {
    type: typeof LOAD_ITEMS,
    items: IListItem[]
}

export interface IAddListItemAction extends Action {
    type: typeof ADD_ITEM
    item: IListItem
}

export interface IUpdateListItemAction extends Action {
    type: typeof UPDATE_ITEM
    item: IListItem
}

export interface ICreateListItemsAction extends Action {
    type: typeof CREATE_ITEMS
    count: number
}

export interface IRemoveListItemAction extends Action {
    type: typeof REMOVE_ITEM
    key: string
}

export interface IReorderListItemAction extends Action {
    type: typeof REORDER_ITEM
    key: string,
    order: number
}

export interface IResetListItemsAction extends Action {
    type: typeof RESET_LIST
}

