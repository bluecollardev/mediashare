import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Tag } from '../../../rxjs-api/models/Tag';

import { makeEnum } from '../../core/factory';

import { ApiService } from '../../apis';
import { reducePendingState, reduceRejectedState, reduceFulfilledState } from '../../helpers';

// Export tag utils
export * from './utils';

const TAG_ACTIONS = ['get_tags'] as const;

export const tagsActionTypes = makeEnum(TAG_ACTIONS);

export const getTags = createAsyncThunk(tagsActionTypes.getTags, async (undefined, { extra }) => {
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
      .addCase(
        getTags.fulfilled,
        reduceFulfilledState((state, action) => ({ ...state, entities: action.payload }))
      );
  },
});

// @ts-ignore
const { reducer } = tagsSlice;
// @ts-ignore
export { reducer };
