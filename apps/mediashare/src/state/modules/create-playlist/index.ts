import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { savePlaylist } from './playlist-api';

import { CreatePlaylistDto } from '../../../rxjs-api';

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
  return await savePlaylist(createPlaylistDto);
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .addCase(createPlaylist.fulfilled, (state, action) => {
        const user = initialStateFactory();
        return { ...user, mediaIds: [] };
      })
      .addCase(createPlaylist.rejected, (state) => {
        return { ...state };
      })
      .addCase(createPlaylist.pending, (state) => {
        return { ...state };
      });
  },
});

const {
  actions: { setCategory, setDescription, setMediaIds, setTitle },
  reducer,
} = slice;

export { reducer, setCategory, setDescription, setMediaIds, setTitle, createPlaylist };
