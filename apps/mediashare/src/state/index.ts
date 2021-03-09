import { LoginDto, LoginResponseDto, UserApi } from '../api';
import * as models from '../api/models';
import { ApiActionDictType } from './models';

const userApi = new UserApi();
export interface ApiResponse<T> {
  isLoading: boolean;
  hasErrors: boolean;
  data: T[];
  errors: any;
}

export interface AppForm {}

export interface RootState {
  users: ApiResponse<models.UserDto[]>;
  user: ApiResponse<models.UserDto>;
  userMediaItems: ApiResponse<models.MediaItemDto[]>;
  userPlaylists: ApiResponse<models.PlaylistResponseDto[]>;
  userPlaylistItems: ApiResponse<models.PlaylistItemResponseDto[]>;
  sharedMediaItems: ApiResponse<models.MediaItemDto[]>;
  sharedPlaylists: ApiResponse<models.PlaylistResponseDto[]>;
  sharedPlaylistItems: ApiResponse<models.PlaylistItemResponseDto[]>;
  forms: { [key: string]: AppForm };
  isLoggedIn: boolean;
  loginResponseDto: LoginResponseDto;
  loginDto: LoginDto;
}

export const apiActionsMap: ApiActionDictType = {
  LOGIN: 'userControllerLogin',
};

const INITIAL_STATE: RootState = {
  users: null,
  user: null,
  userMediaItems: null,
  userPlaylists: null,
  userPlaylistItems: null,
  sharedMediaItems: null,
  sharedPlaylists: null,
  sharedPlaylistItems: null,
  forms: {
    login: { email: null, password: null },
  },
  isLoggedIn: false,
  loginResponseDto: null,

  loginDto: null,
} as const;

export default INITIAL_STATE;
