import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { CreatePlaylistDto } from '../../../rxjs-api';
import { playlists } from '../../apis';

import { reducePendingState, reduceRejectedState } from '../../helpers';

function initialStateFactory(): CreatePlaylistDto & { loading: boolean } {
  return {
    description: '',
    // @ts-ignore
    createdBy: '',
    title: '',
    mediaIds: [],
    category: null,
    loading: false,
  };
}

const CREATE_PLAYLIST_KEY = 'createPlaylist' as const;

// const actions = makeActions(['addItem', 'removeItem', 'setDescription', 'setCreatedBy', 'setTitle', 'setCategory']);

const createPlaylist = createAsyncThunk('createPlaylist', async function (createPlaylistDto: CreatePlaylistDto) {
  return await playlists.playlistControllerCreate({ createPlaylistDto }).toPromise();
});

const slice = createSlice({
  initialState: initialStateFactory(),
  name: CREATE_PLAYLIST_KEY,
  reducers: {
    setMediaIds: (state, action) => {
      const mediaIds = action.payload;
      return { ...state, mediaIds };
    },
    setCreatedBy: (state, action) => {
      return { ...state, createdBy: action.payload };
    },
    setTitle: (state, action) => ({ ...state, title: action.payload }),
    setCategory: (state, action) => ({ ...state, category: action.payload }),
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
  actions: { setCategory, setDescription, setMediaIds, setTitle },
  reducer,
} = slice;

export { reducer, setCategory, setDescription, setMediaIds, setTitle, createPlaylist };
