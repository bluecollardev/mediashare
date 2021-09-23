import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  loading: false,
  error: {
    name: '',
    message: '',
  },
  hasError: false,
};

const appStateSlice = createSlice({
  name: 'appState',
  initialState: INITIAL_STATE,
  reducers: {
    setError: (state, action: PayloadAction<{ name: string; message: string }>) => {
      const { name, message } = action.payload;
      return {
        ...state,
        loading: false,
        hasError: true,
        error: { name: `${name}`, message: `${message}` },
      };
    },
    clearError: (state) => {
      return { ...state, hasError: false, error: { name: '', message: '' } };
    },
    loading: (state, action: PayloadAction<boolean>) => {
      console.log('loading', action);
      return {
        ...state,
        loading: action.payload,
      };
    },
  },
});

export const { loading, setError, clearError } = appStateSlice.actions;
export const reducer = appStateSlice.reducer;
