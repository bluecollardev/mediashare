import { RootState } from '..';
import { PayloadAction } from '@reduxjs/toolkit';

// Initial load
export const loadItems = <T>(
  state: RootState, action: PayloadAction<T>
): RootState => {
  return { ...state }
};

// Get
export const getItem = <T>(
  state: RootState, action: PayloadAction<T>
): RootState => {
  return { ...state }
};
export const getItems = <T>(
  state: RootState, action: PayloadAction<T>
): RootState => {
  return { ...state }
};

// Add
export const addItem = <T>(
  state: RootState, action: PayloadAction<T>
): RootState => {
  return { ...state }
};
export const addItems = <T>(
  state: RootState, action: PayloadAction<T>
): RootState => {
  return { ...state }
};

// Update
export const updateItem = <T>(
  state: RootState, action: PayloadAction<T>
): RootState => {
  return { ...state }
};
export const updateItems = <T>(
  state: RootState, action: PayloadAction<T>
): RootState => {
  return { ...state }
};

// Remove
export const removeItem = <T>(
  state: RootState, action: PayloadAction<T>
): RootState => {
  return { ...state }
};

// Etc.
export const reorderList = <T>(
  state: RootState, action: PayloadAction<T>
) => {
  return { ...state }
};
export const resetList = <T>(
  state: RootState, action: PayloadAction<T>
): RootState => {
  return { ...state }
};
