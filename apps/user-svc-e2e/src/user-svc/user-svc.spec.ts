/* Ignore module boundaries, it's just our test scaffolding */
/* eslint-disable @nx/enforce-module-boundaries */
import { INestApplication } from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import { Mapper } from '@automapper/core';
import { stub } from 'jest-auto-stub/src/index';
import { PinoLogger } from 'nestjs-pino';
import { DataSource, MongoRepository } from 'typeorm';
import { clone } from 'remeda';

import { allValidations } from './fixtures/validations';
import { getBaseUrl, initializeApp, initializeDB, initializeMapper } from './functions/app';
import { defaultOptionsWithBearer, login } from './functions/auth';
import { createUser as createUserFunction } from './functions/generators';

import { AuthenticationResultType } from '@aws-sdk/client-cognito-identity-provider';
import { ApiErrorResponse } from '@mediashare/user-svc/src/app/core/errors/api-error';
import { CreateUserDto } from '@mediashare/user-svc/src/app/modules/user/dto/create-user.dto';
import { UpdateUserDto } from '@mediashare/user-svc/src/app/modules/user/dto/update-user.dto';
import { UserDto } from '@mediashare/user-svc/src/app/modules/user/dto/user.dto';
import { User } from '@mediashare/user-svc/src/app/modules/user/entities/user.entity';
import { UserDataService, UserService } from '@mediashare/user-svc/src/app/modules/user/user.service';
import { testAndCloneUser } from './test-components';

const createAndValidateTestUser = async (createUserFn) => {
  return new Promise((resolve, reject) => {
    const userData = {
      username: 'jsmith',
      email: 'jsmith@example.com',
      firstName: 'John',
      lastName: 'Smith',
    };
    createUserFn(userData)
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
  let app: INestApplication;
  let baseUrl: string;

  let db: DataSource;
  let userService: UserService;
  let userRepository: MongoRepository<User>;
  let userDataService: UserDataService;
  let mapper: Mapper;
  let authResponse: AuthenticationResultType
  let createUser;

  beforeAll(async () => {
    const globalPrefix = 'api'
    app = await initializeApp(globalPrefix);
    baseUrl = await getBaseUrl(app, globalPrefix);

    const logger = stub<PinoLogger>();
    mapper = initializeMapper(User, UserDto, CreateUserDto, UpdateUserDto);
    db = await initializeDB([User]);

    userRepository = await db.getMongoRepository(User);
    userDataService = new UserDataService(userRepository, logger)
    userService = new UserService(userDataService, mapper, logger);

    // Delete all test records
    await userRepository.deleteMany({});

    authResponse = await login(baseUrl, {
      username: process.env.COGNITO_USER_EMAIL,
      password: process.env.COGNITO_USER_PASSWORD,
      clientId: process.env.COGNITO_CLIENT_ID || '1n3of997k64in850vgp1hn849v',
    });
    console.log(`Logged in`, authResponse);

    createUser = createUserFunction({ baseUrl, token: authResponse?.IdToken });
  });

  afterAll(async () => {
    // await app.close();
    await db.close();
  });

  describe('UserApi validation', () => {
    it('POST /user should return the correct validation errors', async () => {
      const dto = {
        firstName: 'J'
      } as CreateUserDto;

      await axios.post(`${baseUrl}/user`, dto, defaultOptionsWithBearer(authResponse?.IdToken))
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

    it('it should NOT save extra fields to db when you supply extra fields', async () => {
      const junkData = {
        'likesCount': 0,
        'sharesCount': 4,
        'sharedCount': 2,
        'sharedItems': [
          {
            '_id': '6190693aa0c0e20021fa2324',
            'title': 'Test',
            'category': 'free',
            'description': 'Make a longer test description for this!',
            'mediaIds': [
              '619a2f18affc010021370ba7',
              '619a2f1caffc010021370ba8'
            ],
          },
          {
            '_id': '6190693aa0c0e20021fa2324',
            'title': 'Test',
            'category': 'free',
            'description': 'We need a longer description for this playlist.',
            'mediaIds': [
              '619a2f18affc010021370ba7',
              '619a2f1caffc010021370ba8'
            ],
          }
        ],
      }
      const userData = {
        username: 'jsmith',
        email: 'jsmith@example.com',
        firstName: 'John',
        lastName: 'Smith',
        ...junkData,
      };
      createUser(userData)
        .then((res) => {
          expect(res.status).toEqual(201);

          const user: UserDto = res.data;
          expect(user._id).toBeDefined();
          const junkUserKeys = Object.keys(junkData);
          const userKeys = [ ...Object.keys(user) ];
          const matches = junkUserKeys.reduce((acc, cur) => {
            if (userKeys.includes(cur)) {
              acc.push(cur);
            }
            return acc;
          }, []);
          expect(matches).toHaveLength(0);
        })
    });
  });


  describe('UserApi should create, find, update and delete a new user', () => {
    it('it should create a new user', async () => {
      await createAndValidateTestUser(createUser);
    });

    it('should get the user we create', async () => {
      const testUser = await createAndValidateTestUser(createUser);
      const testUserId = getTestUserId(testUser);

      await axios.get(`${baseUrl}/user/${testUserId}`, defaultOptionsWithBearer(authResponse?.IdToken))
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
      const testUser = await createAndValidateTestUser(createUser) as UserDto;
      const testUserId = getTestUserId(testUser);

      const dto = clone(testUser) as UpdateUserDto;
      dto.username = 'jr.smith';
      dto.email = 'jr.smith@example.com';

      await axios.put(`${baseUrl}/user/${testUserId}`, dto, defaultOptionsWithBearer(authResponse?.IdToken))
        .then(async (res) => {
          expect(res.status).toEqual(200);

          const updated: UserDto = res.data;
          expect(updated).toBeDefined();
          expect(updated._id).toEqual(testUserId);
          expect(updated.sub).toBeDefined();
          expect(updated.username).toEqual('jr.smith');
          expect(updated.email).toEqual('jr.smith@example.com');
          expect(updated.firstName).toEqual('John');
          expect(updated.lastName).toEqual('Smith');
          expect(updated.createdAt).toEqual(testUser.createdAt);
          expect(updated.updatedDate).toBeDefined();

          // Don't trust the response object - find the user, and make sure it's updated too
          await axios.get(`${baseUrl}/user/${testUserId}`, defaultOptionsWithBearer(authResponse?.IdToken))
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
      const testUser = await createAndValidateTestUser(createUser);
      const testUserId = getTestUserId(testUser);

      await axios.delete(`${baseUrl}/user/${testUserId}`, defaultOptionsWithBearer(authResponse?.IdToken))
        .then((res) => {
          // TODO: Make response 204 if no content
          expect(res.status).toEqual(200);
        });
    });
  });
});
