// TODO: Clean this file up, so it looks liek the other ones....
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { reducePendingState, reduceRejectedState } from 'mediashare/store/helpers';
import { CreatePlaylistDto } from 'mediashare/rxjs-api';

import { playlists } from 'mediashare/store/apis';

function initialStateFactory(): CreatePlaylistDto & { loading: boolean } {
  return {
    description: '',
    // @ts-ignore
    createdBy: '',
    title: '',
    mediaIds: [],
    category: null,
    tags: [],
    loading: false,
  };
}

// const actions = makeActions(['addItem', 'removeItem', 'setDescription', 'setCreatedBy', 'setTitle', 'setCategory', 'setTag']);

const createPlaylist = createAsyncThunk('createPlaylist', async (createPlaylistDto: CreatePlaylistDto) => {
  return await playlists.playlistControllerCreate({ createPlaylistDto }).toPromise();
});

const slice = createSlice({
  initialState: initialStateFactory(),
  name: 'createPlaylist',
  reducers: {
    setMediaIds: (state, action) => {
      const mediaIds = action.payload;
      return { ...state, mediaIds };
    },
    setCreatedBy: (state, action) => ({ ...state, createdBy: action.payload }),
    setTitle: (state, action) => ({ ...state, title: action.payload }),
    setCategory: (state, action) => ({ ...state, category: action.payload }),
    setTags: (state, action) => ({ ...state, tags: action.payload }),
    setDescription: (state, action) => ({ ...state, description: action.payload }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPlaylist.pending, reducePendingState())
      .addCase(createPlaylist.rejected, reduceRejectedState())
      .addCase(createPlaylist.fulfilled, () => {
        const user = initialStateFactory();
        return { ...user, mediaIds: [] };
      });
  },
});

const {
  actions: { setCategory, setTags, setDescription, setMediaIds, setTitle },
  reducer,
} = slice;
export { reducer, setCategory, setTags, setDescription, setMediaIds, setTitle, createPlaylist };
