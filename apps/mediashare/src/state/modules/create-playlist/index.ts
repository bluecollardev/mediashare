import { CreatePlaylistDto } from '../../../rxjs-api';
import { CreatePlaylistDtoCategoryEnum } from '../../../api/models/create-playlist-dto';
import { createSlice } from '@reduxjs/toolkit';
import { bindActionCreators } from 'redux';

const initialState: Partial<CreatePlaylistDto> = {
  description: '',
  createdBy: '',
  title: '',
  mediaIds: [],
  category: CreatePlaylistDtoCategoryEnum.Builder,
};
const CREATE_PLAYLIST_KEY = 'createPlaylist' as const;
// const actions = makeActions(['addItem', 'removeItem', 'setDescription', 'setCreatedBy', 'setTitle', 'setCategory']);

const slice = createSlice({
  initialState,
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
});

const {
  actions: { setCategory, setDescription, setMediaIds, setTitle },
  reducer,
} = slice;

export { reducer, setCategory, setDescription, setMediaIds, setTitle };
