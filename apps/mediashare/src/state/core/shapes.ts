export interface IListItem {
  id: string;
  description: string;
  order: number;
}

export interface IListItemsState {
  readonly items: IListItem[];
}

export const initialListItemsState: IListItemsState = {
  items: [],
};
