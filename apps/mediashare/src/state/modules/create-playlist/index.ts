import { CreatePlaylistDto } from '../../../rxjs-api';
import { CreatePlaylistDtoCategoryEnum } from '../../../api/models/create-playlist-dto';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { bindActionCreators } from 'redux';
import { savePlaylist } from './playlist-api';
import { store } from '../../../boot/index';
import { clearMediaItemSelection } from '../media-items/index';
import { actions } from '../../../boot/configureStore';

function initialStateFactory(): CreatePlaylistDto & { loading: boolean } {
  const initialState = {
    description: '',
    createdBy: '',
    title: '',
    mediaIds: [],
    category: CreatePlaylistDtoCategoryEnum.Builder,
    loading: false,
  };
  const obj = Object.create(null);
  return Object.assign(obj, initialState);
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
        return { ...initialStateFactory(), mediaIds: [] };
      })
      .addCase(createPlaylist.rejected, (state) => {
        return { ...state, loading: false };
      })
      .addCase(createPlaylist.pending, (state) => {
        return { ...state, loading: true };
      });
  },
});

const {
  actions: { setCategory, setDescription, setMediaIds, setTitle },
  reducer,
} = slice;

export { reducer, setCategory, setDescription, setMediaIds, setTitle, createPlaylist };
