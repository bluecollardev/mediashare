import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { makeActions } from 'mediashare/store/factory';
import { reduceFulfilledState, reducePendingState, reduceRejectedState } from 'mediashare/store/helpers';
import { ApiService } from 'mediashare/store/apis';
// import { PlaylistResponseDto, PlaylistItemResponseDto } from 'mediashare/rxjs-api';
import { PlaylistResponseDto } from 'mediashare/rxjs-api';
import { mediaItemsActions } from 'mediashare/store/modules/mediaItems';

// Define these in snake case or our converter won't work... we need to fix that
const searchActionNames = ['search_playlists', 'select_playlist', 'clear_playlists'] as const;

export const searchActions = makeActions(searchActionNames);

export const searchPlaylists = createAsyncThunk(searchActions.searchPlaylists.type, async (args: { text?: string; tags?: string[] }, { extra }) => {
  const { api } = extra as { api: ApiService };
  const { text, tags = [] } = args;
  console.log(`Search playlists args: ${JSON.stringify(args, null, 2)}`);
  console.log(`Searching playlists for: text -> [${text}, tags -> [${JSON.stringify(tags)}]`);
  return await api.search.searchControllerFindAll({ text, tags }).toPromise();
});

export const selectPlaylist = createAction<{ isChecked: boolean; plist: PlaylistResponseDto }, typeof searchActions.selectPlaylist.type>(
  searchActions.selectPlaylist.type
);

export const clearPlaylists = createAction(searchActions.clearPlaylists.type);

export interface SearchState {
  // entities: PlaylistResponseDto[] | PlaylistItemResponseDto[];
  // selected: PlaylistResponseDto[] | PlaylistItemResponseDto[];
  entities: PlaylistResponseDto[];
  selected: PlaylistResponseDto[];
  loading: boolean;
  loaded: boolean;
}

export const searchInitialState: SearchState = {
  entities: [],
  selected: [],
  loading: false,
  loaded: false,
};

const searchSlice = createSlice({
  name: 'search',
  initialState: searchInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchPlaylists.pending, reducePendingState())
      .addCase(searchPlaylists.rejected, reduceRejectedState())
      .addCase(
        searchPlaylists.fulfilled,
        reduceFulfilledState((state, action) => ({
          ...state,
          entities: action.payload,
          loading: false,
          loaded: true,
        }))
      )
      .addCase(selectPlaylist, (state, action) => {
        const updateSelection = (bool: boolean, item: PlaylistResponseDto) => {
          const { selected } = state;
          // @ts-ignore
          return bool ? selected.concat([item]) : selected.filter((plist) => plist._id !== item._id); // Is it filtered?
        };
        return { ...state, selected: updateSelection(action.payload.isChecked, action.payload.plist), loading: false, loaded: true };
      })
      .addCase(clearPlaylists, (state) => ({
        // TODO: Shouldn't we be clearing selected media items?
        ...state,
        selected: [],
        loading: false,
        loaded: true,
        // ...state, entities: [], loading: false, loaded: true
      }));
  },
});

export default searchSlice;
export const reducer = searchSlice.reducer;
