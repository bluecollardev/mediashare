import * as Faker from 'faker';
import { User } from '../controllers/user/entities/user.entity';

export function userFactory() {
  return new User({
    username: Faker.internet.email(),
    firstName: Faker.name.firstName(),
    lastName: Faker.name.lastName(),
  });
}

export function userPropsFactory() {
  const username = Faker.internet.email();
  return { username };
}
