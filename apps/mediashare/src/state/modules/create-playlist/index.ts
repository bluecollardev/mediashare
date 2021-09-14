import { CreatePlaylistDto } from '../../../rxjs-api';
import { CreatePlaylistDtoCategoryEnum } from '../../../api/models/create-playlist-dto';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { savePlaylist } from './playlist-api';
import { store } from '../../../boot/index';

function initialStateFactory(): CreatePlaylistDto & { loading: boolean } {
  return {
    description: '',
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
  const playlist = await savePlaylist(createPlaylistDto);

  return playlist;
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
      .addCase(createPlaylist.fulfilled, (state, action) => {
        console.log('submitted', action);
        const user = initialStateFactory();
        console.log(user);
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
