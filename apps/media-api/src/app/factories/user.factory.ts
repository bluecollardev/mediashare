import * as Faker from 'faker';
import { User } from '../modules/user/entities/user.entity';

export function userFactory() {
  return new User();
}

export function userPropsFactory() {
  const username = Faker.internet.email();
  return { username };
}
