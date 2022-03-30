import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Tag } from 'mediashare/rxjs-api';

import { makeActions } from 'mediashare/store/factory';

import { ApiService } from 'mediashare/store/apis';
import { reducePendingState, reduceRejectedState, reduceFulfilledState } from 'mediashare/store/helpers';

// Export tag utils
export * from '../../core/utils/tags';

const tagActionNames = ['get_tags'] as const;

export const tagsActionTypes = makeActions(tagActionNames);

export const getTags = createAsyncThunk(tagsActionTypes.getTags.type, async (undefined, { extra }) => {
  const { api } = extra as { api: ApiService };
  return await api.tags.tagsControllerFindAll().toPromise();
});

interface InitialState {
  entities: Tag[];
  loading: boolean;
  loaded: boolean;
}

const INITIAL_STATE: InitialState = {
  entities: [],
  loading: false,
  loaded: false,
};

const tagsSlice = createSlice({
  name: 'tagsSlice',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTags.pending, reducePendingState())
      .addCase(getTags.rejected, reduceRejectedState())
      .addCase(getTags.fulfilled, reduceFulfilledState((state, action) => {
        return ({ ...state, entities: action.payload })
      }));
  },
});

export default tagsSlice;
export const reducer = tagsSlice.reducer;
