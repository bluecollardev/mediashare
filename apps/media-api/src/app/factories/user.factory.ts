import * as Faker from 'faker';
import { define } from 'typeorm-factories';
import { User } from '../controllers/user/entities/user.entity';

define(User, (faker: typeof Faker) => {
  const user = new User();

  user.id = faker.random.uuid();
  user.username = faker.lorem.email;

  return user;
});

export function userFactory(faker: Faker) {
  return new User({ id: faker.random.uuid(), username: faker.lorem.email });
}
