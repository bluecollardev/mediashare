import * as models from '../api/models';

export interface ApiResponse<T> {
  isLoading: boolean;
  hasErrors: boolean;
  data: T[];
  errors: any;
}

export interface AppForm {}

export interface RootState {
  users: ApiResponse<models.UserDto[]>,
  user: ApiResponse<models.UserDto>,
  userMediaItems: ApiResponse<models.MediaItemDto[]>,
  userPlaylists: ApiResponse<models.PlaylistResponseDto[]>,
  userPlaylistItems: ApiResponse<models.PlaylistItemResponseDto[]>,
  sharedMediaItems: ApiResponse<models.MediaItemDto[]>,
  sharedPlaylists: ApiResponse<models.PlaylistResponseDto[]>,
  sharedPlaylistItems: ApiResponse<models.PlaylistItemResponseDto[]>,
  forms: { [key: string]: AppForm }
}
