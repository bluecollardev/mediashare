import { AuthUserInterface, AuthUserResponseType } from '@core-lib';

import * as R from 'remeda';
import { UserDto } from './create-user.dto';
import { User } from '../entities/user.entity';

export function createUserResponseDto(profile: User): UserDto {
  const pickFields: Array<keyof User> = ['username', 'createdAt', '_id', 'firstName', 'lastName'];

  // const merged = R.merge(profile, user);

  const pickedFields = R.pick(profile, pickFields);
  const userDto = new UserDto(pickedFields);
  return userDto;
}
