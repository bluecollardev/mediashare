import { RootState } from '..';
import { PayloadAction } from '@reduxjs/toolkit';

// Initial load
export const loadItems = (stateKey: string) => <T>(state: RootState, action: PayloadAction<T>): RootState => {
  return { ...state, [stateKey]: action.payload };
};

// Add
export const addItem = (stateKey: string) => <T>(state: RootState, action: PayloadAction<T>): RootState => {
  const items = state[stateKey]; // TODO: Check for dupes?
  return { ...state, [stateKey]: items.concat([action.payload]) };
};
export const addItems = (stateKey: string) => <T>(state: RootState, action: PayloadAction<T>): RootState => {
  const items = state[stateKey];
  // TODO: Maybe we can do something better
  const createCount = action.payload['count'];
  const startIndex = items.length > 0 ? Math.max(...items.map((item) => item.order)) + 1 : 0;
  const maxIndex = startIndex + createCount;
  const newItems = [];
  for (let idx = startIndex; idx < maxIndex; idx++) {
    newItems.push({
      id: `item_${idx}`,
      description: '',
      order: idx,
    });
  }
  // TODO: Check for dupes?
  const stateItems = items.concat(newItems);
  return { ...state, [stateKey]: stateItems };
};

// Update
export const updateItem = (stateKey: string) => <T>(state: RootState, action: PayloadAction<T>): RootState => {
  const items = state[stateKey];
  if (!action.payload['id']) return { ...state }; // We could throw an error here...
  const item = items.find((item) => item['id'] === action.payload['id']);
  if (!item) return { ...state }; // We could throw an error here...
  const stateItems = [...items];
  stateItems.splice(items.indexOf(item), 1, action.payload);
  return { ...state, [stateKey]: stateItems };
};
export const updateItems = (stateKey: string) => <T>(state: RootState, action: PayloadAction<T>): RootState => {
  return { ...state };
};

// Remove
export const removeItem = (stateKey: string) => <T>(state: RootState, action: PayloadAction<T>): RootState => {
  const items = state[stateKey];
  if (!action.payload['id']) return { ...state }; // We could throw an error here...
  const item = items.find((item) => item['id'] === action.payload['id']);
  if (!item) return { ...state }; // We could throw an error here...
  const stateItems = [...items];
  stateItems.splice(items.indexOf(item), 1);
  return { ...state, [stateKey]: stateItems };
};

// Etc.
export const reorderItems = (stateKey: string) => <T>(state: RootState, action: PayloadAction<T>) => {
  return { ...state };
};
export const resetItems = (stateKey: string) => <T>(state: RootState, action: PayloadAction<T>): RootState => {
  return { ...state, [stateKey]: [] };
};
