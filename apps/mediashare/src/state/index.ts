import { LoginDto, LoginResponseDto } from '../api';
import * as models from '../api/models';

export interface ErrorType {
  description: string;
  message: string;
}

export type ApiResponse<T> = T;
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
  isLoading: boolean;
  errors: ErrorType[];
  page: string;
  lastPage: string;
}

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
    login: { email: '', password: '' },
  },
  isLoggedIn: false,
  loginResponseDto: null,
  loginDto: null,
  isLoading: false,
  errors: null,
  page: null,
  lastPage: null,
} as const;

export default INITIAL_STATE;
