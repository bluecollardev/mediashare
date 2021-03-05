import { AuthUserInterface, AuthUserResponseType } from '@core-lib';

import * as R from 'remeda';
import { UserDto } from './create-user.dto';
import { User } from '../entities/user.entity';

export function createUserResponseDto(profile: User, user: Omit<AuthUserInterface, 'password'>): UserDto {
  const pickFields: Array<keyof AuthUserResponseType | keyof User> = [
    'authId',
    'username',
    'email',
    'createdAt',
    '_id',
    'firstName',
    'lastName',
  ];

  const merged = R.merge(profile, user);

  const pickedFields = R.pick(merged, pickFields);
  const userDto = new UserDto(pickedFields);
  Object.assign(userDto, merged);
  return userDto;
}
