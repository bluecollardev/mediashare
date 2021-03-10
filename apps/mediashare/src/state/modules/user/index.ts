import { MediaItemDto, UserDto } from '../../../api';

export interface UserState {
  users: UserDto[];
  user: UserDto;
  userMediaItems: MediaItemDto[];
}
