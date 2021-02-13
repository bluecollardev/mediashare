import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PinoLogger } from 'nestjs-pino';
import * as Faker from 'faker';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(User),
          useClass: mockRepositoryFactory(),
        },
        { provide: PinoLogger, useValue: {} },
        UserService,
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user ', async () => {
      const objectToTest = userFactory(Faker);
      const expected = userFactory(Faker);
      const received = await service.create(objectToTest);

      expect(received).toEqual(expected);
    });
  });

  describe('findaAll', () => {
    it('should return many users', () => {});
  });
  describe('findOne', () => {
    it('should return an existing user', () => {});
  });

  describe('update', () => {});

  describe('remove', () => {});

  it('');
});
function mockRepositoryFactory(): import('@nestjs/common').Type<any> {
  throw new Error('Function not implemented.');
}
function userFactory(arg0: any): User {
  throw new Error('Function not implemented.');
}
