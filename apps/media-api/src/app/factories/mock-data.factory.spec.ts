import { UserFactory, userDataFactory } from './mock-data.factory';
describe('make user', () => {
  it('should create userData', () => {
    const user = userDataFactory(new UserFactory());

    expect(user).toBeDefined();
  });
});
