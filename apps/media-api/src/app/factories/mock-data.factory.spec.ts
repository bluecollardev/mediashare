import { ConcreteUser, userDataFactory } from './mock-data.factory';
describe('make user', () => {
  it('should create userData', () => {
    const user = userDataFactory(new ConcreteUser());
    console.log(
      '🚀 ---------------------------------------------------------------'
    );
    console.log(
      '🚀 ~ file: mock-data.factory.spec.ts ~ line 9 ~ it ~ user',
      user
    );
    console.log(
      '🚀 ---------------------------------------------------------------'
    );

    expect(user).toBeDefined();
  });
});
