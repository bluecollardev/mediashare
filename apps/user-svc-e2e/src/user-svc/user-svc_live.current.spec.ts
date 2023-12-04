/* Ignore module boundaries, it's just our test scaffolding */
/* eslint-disable @nx/enforce-module-boundaries */
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { clone } from 'remeda';
import { DataSource, MongoRepository } from 'typeorm';

import { initializeDB } from './functions/app';
import { defaultOptionsWithBearer, login } from './functions/auth';
import {
  createAndValidateTestUser,
  createUser as createUserFunction,
  getTestUserId,
} from './functions/user';

import { AuthenticationResultType } from '@aws-sdk/client-cognito-identity-provider';
import { UpdateUserDto } from '@mediashare/user-svc/src/app/modules/user/dto/update-user.dto';
import { UserDto } from '@mediashare/user-svc/src/app/modules/user/dto/user.dto';
import { User } from '@mediashare/user-svc/src/app/modules/user/entities/user.entity';

describe.skip('UserAPI.current.e2e', () => {
  let baseUrl: string;

  let db: DataSource;
  let userRepository: MongoRepository<User>;
  let authResponse: AuthenticationResultType;
  let createUser;
  let testUser;
  let testUserId;

  beforeAll(async () => {
    const globalPrefix = 'api';
    baseUrl = `http://localhost:5000/${globalPrefix}`;

    db = await initializeDB([User]);
    userRepository = await db.getMongoRepository(User);

    // Delete all test records
    await userRepository.deleteMany({});
  });

  beforeEach(async () => {
    // Delete all test records
    await userRepository.deleteMany({});
  });

  afterAll(async () => {
    // await app.close();
    await db.close();
  });

  describe('UserApi should get the current user', () => {
    it('should get the current user', async () => {
      // Login first
      const creds = {
        username: process.env.COGNITO_USER_EMAIL,
        password: process.env.COGNITO_USER_PASSWORD,
        clientId: process.env.COGNITO_CLIENT_ID || '1n3of997k64in850vgp1hn849v',
      };
      authResponse = await login(baseUrl, creds);
      console.log(`Logged in`, authResponse);
      // const idToken = jwt.decode(authResponse?.IdToken);
      const {
        sub,
        email,
        phone_number: phoneNumber,
      } = jwt.decode(authResponse?.IdToken) as any;

      const testUserData = {
        sub,
        email,
        username: 'bcdevlucas',
        firstName: 'Lucas',
        lastName: 'Lopatka',
        phoneNumber,
      };
      // Create a corresponding user in the database
      createUser = createUserFunction({
        baseUrl,
        token: authResponse?.IdToken,
      });
      testUser = await createAndValidateTestUser(createUser, testUserData);
      testUserId = getTestUserId(testUser);

      await axios
        .get(`${baseUrl}/user`, defaultOptionsWithBearer(authResponse?.IdToken))
        .then((res) => {
          expect(res.status).toEqual(200);

          const user: UserDto = res.data;
          expect(user._id).toBeDefined();
          // TODO: Fix this, sub is not defined!
          // expect(user.sub).toBeDefined();
          expect(user.username).toEqual(testUser?.username);
          expect(user.email).toEqual(testUser?.email);
          expect(user.firstName).toEqual(testUser?.firstName);
          expect(user.lastName).toEqual(testUser?.lastName);
          expect(user.phoneNumber).toEqual(testUser?.phoneNumber);
          // TODO: This actually returns a profile object with authorId, author, authorImage and authorName
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
  });

  describe('UserApi should update the current user', () => {
    it('should update the current user', async () => {
      // Login first
      const creds = {
        username: process.env.COGNITO_USER_EMAIL,
        password: process.env.COGNITO_USER_PASSWORD,
        clientId: process.env.COGNITO_CLIENT_ID || '1n3of997k64in850vgp1hn849v',
      };
      authResponse = await login(baseUrl, creds);
      console.log(`Logged in`, authResponse);
      // const idToken = jwt.decode(authResponse?.IdToken);
      const {
        sub,
        email,
        phone_number: phoneNumber,
      } = jwt.decode(authResponse?.IdToken) as any;

      const testUserData = {
        sub,
        email,
        username: 'bcdevlucas',
        firstName: 'Lucas',
        lastName: 'Lopatka',
        phoneNumber,
      };
      // Create a corresponding user in the database
      createUser = createUserFunction({
        baseUrl,
        token: authResponse?.IdToken,
      });
      testUser = await createAndValidateTestUser(createUser, testUserData);
      testUserId = getTestUserId(testUser);

      const dto = clone(testUser) as UpdateUserDto;
      dto.username = 'bcdevtest';
      // TODO: Don't allow updating email, somehow we have to do this with Cognito
      // tags.email = 'lucastest@bluecollardev.com';
      dto.firstName = 'Michael';
      dto.lastName = 'Laosee';

      await axios
        .put(
          `${baseUrl}/user`,
          dto,
          defaultOptionsWithBearer(authResponse?.IdToken)
        )
        .then(async (res) => {
          expect(res.status).toEqual(200);

          const updated: UserDto = res.data;
          expect(updated).toBeDefined();
          expect(updated._id).toEqual(testUserId);
          expect(updated.sub).toEqual(testUser.sub);
          expect(updated.username).toEqual(dto.username);
          expect(updated.email).toEqual(dto.email);
          expect(updated.firstName).toEqual(dto.firstName);
          expect(updated.lastName).toEqual(dto.lastName);
          expect(updated.createdAt).toEqual(testUser.createdAt);
          expect(updated.updatedDate).toBeDefined();
          expect(new Date(updated.updatedDate).getTime()).toBeLessThanOrEqual(
            new Date(testUser.createdAt).getTime()
          );

          // Don't trust the response object - find the user, and make sure it's updated too
          await axios
            .get(
              `${baseUrl}/user`,
              defaultOptionsWithBearer(authResponse?.IdToken)
            )
            .then((res) => {
              expect(res.status).toEqual(200);

              const user: UserDto = res.data;
              expect(user).toBeDefined();
              expect(user._id).toEqual(testUserId);
              // expect(updated.sub).toEqual(testUser.sub);
              expect(user.username).toEqual(dto.username);
              expect(user.email).toEqual(dto.email);
              expect(user.firstName).toEqual(dto.firstName);
              expect(user.lastName).toEqual(dto.lastName);
              // TODO: Should ProfileDto return dates?
              // expect(user.createdAt).toEqual(testUser.createdAt);
              // expect(user.updatedDate).toBeDefined();
            });
        })
        .catch((err) => {
          throw err;
          // expect(err).toBeDefined();
          // throwValidationError(errors);
        });
    });
  });

  describe('UserApi should delete the current user', () => {
    it('should delete the current user', async () => {
      // Login first
      const creds = {
        username: process.env.COGNITO_USER_EMAIL,
        password: process.env.COGNITO_USER_PASSWORD,
        clientId: process.env.COGNITO_CLIENT_ID || '1n3of997k64in850vgp1hn849v',
      };
      authResponse = await login(baseUrl, creds);
      console.log(`Logged in`, authResponse);
      // const idToken = jwt.decode(authResponse?.IdToken);
      const {
        sub,
        email,
        phone_number: phoneNumber,
      } = jwt.decode(authResponse?.IdToken) as any;

      const testUserData = {
        sub,
        email,
        username: 'bcdevlucas',
        firstName: 'Lucas',
        lastName: 'Lopatka',
        phoneNumber,
      };
      // Create a corresponding user in the database
      createUser = createUserFunction({
        baseUrl,
        token: authResponse?.IdToken,
      });
      // TODO: Try a get to make sure the user is deleted
      testUser = await createAndValidateTestUser(createUser, testUserData);
      testUserId = getTestUserId(testUser);

      await axios
        .delete(
          `${baseUrl}/user`,
          defaultOptionsWithBearer(authResponse?.IdToken)
        )
        .then((res) => {
          // TODO: Make response 204 if no content
          expect(res.status).toEqual(200);
        });
    });
  });
});
