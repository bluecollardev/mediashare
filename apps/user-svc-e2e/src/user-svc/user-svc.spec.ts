/* Ignore module boundaries, it's just our test scaffolding */
/* eslint-disable @nx/enforce-module-boundaries */
import axios, { AxiosError } from 'axios';
import { Mapper } from '@automapper/core';
import { stub } from 'jest-auto-stub/src/index';
import { PinoLogger } from 'nestjs-pino';
import { DataSource, MongoRepository } from 'typeorm';
import { clone } from 'remeda';

import { baseUrl } from './constants';
import { allValidations } from './fixtures/validations';
import { defaultOptionsWithBearer } from './functions/auth';
import { createUser } from './functions/generators';
import { initializeDB, initializeMapper } from './functions/initializer';

import { ApiErrorResponse } from '@mediashare/user-svc/src/app/core/errors/api-error';
import { CreateUserDto } from '@mediashare/user-svc/src/app/modules/user/dto/create-user.dto';
import { UpdateUserDto } from '@mediashare/user-svc/src/app/modules/user/dto/update-user.dto';
import { UserDto } from '@mediashare/user-svc/src/app/modules/user/dto/user.dto';
import { User } from '@mediashare/user-svc/src/app/modules/user/entities/user.entity';
import { UserDataService, UserService } from '@mediashare/user-svc/src/app/modules/user/user.service';
import { testAndCloneUser } from './test-components';

const createAndValidateTestUser = async () => {
  return new Promise((resolve, reject) => {
    const userData = {
      username: 'jsmith',
      email: 'jsmith@example.com',
      firstName: 'John',
      lastName: 'Smith',
    };
    createUser(userData)
      .then((res) => {
        expect(res.status).toEqual(201);
        const user: UserDto = res.data;
        testAndCloneUser(user, userData);
        resolve(user);
      })
      .catch((err) => {
        expect(err).toBeDefined();
        reject(err);
      });
  });
}

const getTestUserId = (testUser) => testUser._id.toString();

describe('UserAPI.e2e', () => {
  let db: DataSource;
  let userService: UserService;
  let userRepository: MongoRepository<User>;
  let userDataService: UserDataService;
  let mapper: Mapper;

  beforeAll(async () => {
    const logger = stub<PinoLogger>();
    mapper = initializeMapper(User, UserDto, CreateUserDto, UpdateUserDto);
    db = await initializeDB([User]);

    userRepository = await db.getMongoRepository(User);
    userDataService = new UserDataService(userRepository, logger)
    userService = new UserService(userDataService, mapper, logger);

    // Delete all test records
    await userRepository.deleteMany({});
  });

  afterAll(async () => {
    await db.close();
  });

  describe('UserApi validation', () => {
    it('POST /user should return the correct validation errors', async () => {
      const dto = {
        firstName: 'J'
      } as CreateUserDto;

      await axios.post(`${baseUrl}/user`, dto, defaultOptionsWithBearer())
        .catch((res: AxiosError) => {
          const {
            code,
            displayMessage,
            additionalMessages,
          }: ApiErrorResponse = res.response.data as ApiErrorResponse;
          expect(res.response.status).toEqual(422);
          expect(code).toEqual('ValidationError');
          expect(displayMessage).toEqual('Validation failed');
          expect(additionalMessages).toBeInstanceOf(Array);
          expect(JSON.stringify(additionalMessages))
            .toEqual(JSON.stringify(allValidations));
        });
    });
  });


  describe('UserApi should create, find, update and delete a new user', () => {
    it('it should create a new user', async () => {
      await createAndValidateTestUser();
    });

    it('should get the user we create', async () => {
      const testUser = await createAndValidateTestUser();
      const testUserId = getTestUserId(testUser);

      await axios.get(`${baseUrl}/user/${testUserId}`, defaultOptionsWithBearer())
        .then((res) => {
          expect(res.status).toEqual(200);

          const user: UserDto = res.data;
          expect(user._id).toBeDefined();
          // TODO: Fix this, sub is not defined!
          // expect(user.sub).toBeDefined();
          expect(user.username).toEqual('jsmith');
          expect(user.email).toEqual('jsmith@example.com');
          expect(user.firstName).toEqual('John');
          expect(user.lastName).toEqual('Smith');
          // TODO: Dates aren't being returned, fix this!
          // expect(user.createdAt).toBeDefined();
          // expect(user.updatedDate).toBeDefined();
        })
        .catch((err) => {
          throw err;
          // expect(err).toBeDefined();
          // throwValidationError(errors);
        });
    });

    it('should update the user we create', async () => {
      const testUser = await createAndValidateTestUser();
      const testUserId = getTestUserId(testUser);

      const dto = clone(testUser) as UpdateUserDto;
      dto.username = 'jr.smith';
      dto.email = 'jr.smith@example.com';

      await axios.put(`${baseUrl}/user/${testUserId}`, dto, defaultOptionsWithBearer())
        .then(async (res) => {
          expect(res.status).toEqual(200);

          const updated: UserDto = res.data;
          expect(updated._id).toBeDefined();
          expect(updated).toBeDefined();
          expect(updated.sub).toBeDefined();
          expect(updated.username).toEqual('jr.smith');
          expect(updated.email).toEqual('jr.smith@example.com');
          expect(updated.firstName).toEqual('John');
          expect(updated.lastName).toEqual('Smith');
          expect(updated.createdAt).toBeDefined();
          expect(updated.updatedDate).toBeDefined();

          // Don't trust the response object - find the user, and make sure it's updated too
          await axios.get(`${baseUrl}/user/${testUserId}`, defaultOptionsWithBearer())
            .then((res) => {
              expect(res.status).toEqual(200);

              const user: UserDto = res.data;
              expect(user).toBeDefined();
              expect(user.sub).toBeUndefined();
              expect(user.username).toEqual('jr.smith');
              expect(user.email).toEqual('jr.smith@example.com');
              expect(user.firstName).toEqual('John');
              expect(user.lastName).toEqual('Smith');
            });
        })
        .catch((err) => {
          throw err;
          // expect(err).toBeDefined();
          // throwValidationError(errors);
        });
    });

    it('should delete the user we created', async () => {
      const testUser = await createAndValidateTestUser();
      const testUserId = getTestUserId(testUser);

      await axios.delete(`${baseUrl}/user/${testUserId}`, defaultOptionsWithBearer())
        .then((res) => {
          // TODO: Make response 204 if no content
          expect(res.status).toEqual(200);
        });
    });
  });
});
