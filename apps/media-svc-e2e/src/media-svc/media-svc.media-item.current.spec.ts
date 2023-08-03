/* Ignore module boundaries, it's just our test scaffolding */
/* eslint-disable @nx/enforce-module-boundaries */
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { clone } from 'remeda';
import { DataSource, MongoRepository } from 'typeorm';

import { AuthenticationResultType } from '@aws-sdk/client-cognito-identity-provider';
import { UpdateMediaItemDto } from '@mediashare/media-svc/src/app/modules/media-item/dto/update-media-item.dto';
import { MediaItemDto } from '@mediashare/media-svc/src/app/modules/media-item/dto/media-item.dto';
import { MediaItem } from '@mediashare/media-svc/src/app/modules/media-item/entities/media-item.entity';
import { User } from '@mediashare/user-svc/src/app/modules/user/entities/user.entity';
import { INestApplication } from '@nestjs/common';
import {
  createAndValidateTestUser,
  createUser as createUserFunction, getTestUserId
} from '../../../user-svc-e2e/src/user-svc/functions/user';

import { getBaseUrl, initializeApp, initializeDB } from './functions/app';
import { defaultOptionsWithBearer, login } from './functions/auth';
import { createAndValidateTestMediaItem, createMediaItem as createMediaItemFunction, getTestMediaItemId } from './functions/media-item';

const userApiBaseUrl = `http://localhost:3000/api`;

describe('MediaItemAPI.e2e', () => {
  let app: INestApplication;
  let baseUrl: string;

  let db: DataSource;
  let mediaItemRepository: MongoRepository<MediaItem>;
  let userRepository: MongoRepository<User>
  let authResponse: AuthenticationResultType
  let createMediaItem;
  let testMediaItem;
  let testMediaItemId;
  let createUser;
  let testUser;
  let testUserId

  beforeAll(async () => {
    const globalPrefix = 'api'
    app = await initializeApp(globalPrefix);
    baseUrl = await getBaseUrl(app, globalPrefix);

    db = await initializeDB([MediaItem, User]);
    mediaItemRepository = await db.getMongoRepository(MediaItem);
    userRepository = await db.getMongoRepository(User);

    // Delete all test records
    await mediaItemRepository.deleteMany({});
  });

  beforeEach(async () => {
    // Delete all test records
    await mediaItemRepository.deleteMany({});
    await userRepository.deleteMany({});
  });

  afterAll(async () => {
    // await app.close();
    await db.close();
  });

  describe('MediaItemAPI should get the mediaItem', () => {
    it('should get the mediaItem', async () => {
      // Login first
      const creds = {
        username: process.env.COGNITO_USER_EMAIL,
        password: process.env.COGNITO_USER_PASSWORD,
        clientId: process.env.COGNITO_CLIENT_ID || '1n3of997k64in850vgp1hn849v',
      };
      authResponse = await login(baseUrl, creds);
      console.log(`Logged in`, authResponse);
      // const idToken = jwt.decode(authResponse?.IdToken);
      const { sub, email, phone_number: phoneNumber } = jwt.decode(authResponse?.IdToken) as any;

      const testUserData = {
        sub,
        email,
        username: 'bcdevlucas',
        firstName: 'Lucas',
        lastName: 'Lopatka',
        phoneNumber,
      };
      // Create a corresponding user in the database
      createUser = createUserFunction({ baseUrl: userApiBaseUrl, token: authResponse?.IdToken });
      testUser = await createAndValidateTestUser(createUser, testUserData);
      testUserId = getTestUserId(testUser);

      const testMediaItemData = {
        key: 'test-key',
        userId: testUserId,
        title: 'Test Media',
        description: 'Test media description',
        uri: 'https://www.example.com',
        visibility: 'public',
      };
      // Create a corresponding mediaItem in the database
      createMediaItem = createMediaItemFunction({ baseUrl, token: authResponse?.IdToken });
      testMediaItem = await createAndValidateTestMediaItem(createMediaItem, testMediaItemData);
      testMediaItemId = getTestMediaItemId(testMediaItem);

      await axios.get(`${baseUrl}/media-items/${testMediaItemId}`, defaultOptionsWithBearer(authResponse?.IdToken))
        .then((res) => {
          expect(res.status).toEqual(200);

          const mediaItem: MediaItemDto = res.data;
          expect(mediaItem._id).toBeDefined();
          // TODO: This actually returns a profile object with authorId, author, authorImage and authorName
          // TODO: Dates aren't being returned, fix this!
          // expect(mediaItem.createdAt).toBeDefined();
          // expect(mediaItem.updatedDate).toBeDefined();
        })
        .catch((err) => {
          throw err;
          // expect(err).toBeDefined();
          // throwValidationError(errors);
        });
    });
  });

  describe('MediaItemAPI should update the mediaItem', () => {
    it('should update the mediaItem', async () => {
      // Login first
      const creds = {
        username: process.env.COGNITO_USER_EMAIL,
        password: process.env.COGNITO_USER_PASSWORD,
        clientId: process.env.COGNITO_CLIENT_ID || '1n3of997k64in850vgp1hn849v',
      };
      authResponse = await login(baseUrl, creds);
      console.log(`Logged in`, authResponse);
      // const idToken = jwt.decode(authResponse?.IdToken);
      const { sub, email, phone_number: phoneNumber } = jwt.decode(authResponse?.IdToken) as any;

      const testUserData = {
        sub,
        email,
        username: 'bcdevlucas',
        firstName: 'Lucas',
        lastName: 'Lopatka',
        phoneNumber,
      };
      // Create a corresponding user in the database
      createUser = createUserFunction({ baseUrl: userApiBaseUrl, token: authResponse?.IdToken });
      testUser = await createAndValidateTestUser(createUser, testUserData);
      testUserId = getTestUserId(testUser);

      const testMediaItemData = {
        key: 'test-key',
        userId: testUserId,
        title: 'Test Media',
        description: 'Test media description',
        uri: 'https://www.example.com',
        visibility: 'public',
      };
      // Create a corresponding mediaItem in the database
      createMediaItem = createMediaItemFunction({ baseUrl, token: authResponse?.IdToken });
      testMediaItem = await createAndValidateTestMediaItem(createMediaItem, testMediaItemData);
      testMediaItemId = getTestMediaItemId(testMediaItem);

      const dto = clone(testMediaItem) as UpdateMediaItemDto;

      await axios.put(`${baseUrl}/media-items/${testMediaItemId}`, dto, defaultOptionsWithBearer(authResponse?.IdToken))
        .then(async (res) => {
          expect(res.status).toEqual(200);

          const updated: MediaItemDto = res.data;
          expect(updated).toBeDefined();
          expect(updated._id).toEqual(testMediaItemId);
          expect(updated.createdAt).toEqual(testMediaItem.createdAt);
          expect(updated.updatedDate).toBeDefined();
          expect(new Date(updated.updatedDate).getTime()).toBeLessThanOrEqual(new Date(testMediaItem.createdAt).getTime());

          // Don't trust the response object - find the mediaItem, and make sure it's updated too
          await axios.get(`${baseUrl}/media-items/${testMediaItemId}`, defaultOptionsWithBearer(authResponse?.IdToken))
            .then((res) => {
              expect(res.status).toEqual(200);

              const mediaItem: MediaItemDto = res.data;
              expect(mediaItem).toBeDefined();
              expect(mediaItem._id).toEqual(testMediaItemId);
              // TODO: Should ProfileDto return dates?
              // expect(mediaItem.createdAt).toEqual(testMediaItem.createdAt);
              // expect(mediaItem.updatedDate).toBeDefined();
            });
        })
        .catch((err) => {
          throw err;
          // expect(err).toBeDefined();
          // throwValidationError(errors);
        });
    });
  });

  describe('MediaItemAPI should delete the mediaItem', () => {
    it('should delete the mediaItem', async () => {
      // Login first
      const creds = {
        username: process.env.COGNITO_USER_EMAIL,
        password: process.env.COGNITO_USER_PASSWORD,
        clientId: process.env.COGNITO_CLIENT_ID || '1n3of997k64in850vgp1hn849v',
      };
      authResponse = await login(baseUrl, creds);
      console.log(`Logged in`, authResponse);
      // const idToken = jwt.decode(authResponse?.IdToken);
      const { sub, email, phone_number: phoneNumber } = jwt.decode(authResponse?.IdToken) as any;

      const testUserData = {
        sub,
        email,
        username: 'bcdevlucas',
        firstName: 'Lucas',
        lastName: 'Lopatka',
        phoneNumber,
      };
      // Create a corresponding user in the database
      createUser = createUserFunction({ baseUrl: userApiBaseUrl, token: authResponse?.IdToken });
      testUser = await createAndValidateTestUser(createUser, testUserData);
      testUserId = getTestUserId(testUser);

      const testMediaItemData = {
        key: 'test-key',
        userId: testUserId,
        title: 'Test Media',
        description: 'Test media description',
        uri: 'https://www.example.com',
        visibility: 'public',
      };
      // Create a corresponding mediaItem in the database
      createMediaItem = createMediaItemFunction({ baseUrl, token: authResponse?.IdToken });
      // TODO: Try a get to make sure the mediaItem is deleted
      testMediaItem = await createAndValidateTestMediaItem(createMediaItem, testMediaItemData);
      testMediaItemId = getTestMediaItemId(testMediaItem);

      await axios.delete(`${baseUrl}/media-items/${testMediaItemId}`, defaultOptionsWithBearer(authResponse?.IdToken))
        .then((res) => {
          // TODO: Make response 204 if no content
          expect(res.status).toEqual(200);
        });
    });
  });
});
