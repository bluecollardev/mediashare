import { pick } from 'remeda';
import { UserDto } from './create-user.dto';
import { User } from '../entities/user.entity';

export function createUserResponseDto(profile: User): UserDto {
  const pickFields: Array<keyof User> = ['username', 'createdAt', '_id', 'firstName', 'lastName'];
  const pickedFields = pick(profile, pickFields);
  return new UserDto({ ...pickedFields });
}
