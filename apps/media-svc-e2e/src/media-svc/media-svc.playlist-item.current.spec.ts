/* Ignore module boundaries, it's just our test scaffolding */
/* eslint-disable @nx/enforce-module-boundaries */
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { clone } from 'remeda';
import { INestApplication } from '@nestjs/common';

import { DataSource, MongoRepository } from 'typeorm';
import {
  createAndValidateTestUser,
  createUser as createUserFunction, getTestUserId
} from './functions/user';
import {
  createAndValidateTestMediaItem,
  createMediaItem as createMediaItemFunction, getTestMediaItemId
} from './functions/media-item';
import {
  createAndValidateTestPlaylist,
  createPlaylist as createPlaylistFunction, getTestPlaylistId
} from './functions/playlist';

import { getBaseUrl, initializeApp, initializeDB } from './functions/app';
import { defaultOptionsWithBearer, login } from './functions/auth';
import { createAndValidateTestPlaylistItem, createPlaylistItem as createPlaylistItemFunction, getTestPlaylistItemId } from './functions/playlist-item';

import { AuthenticationResultType } from '@aws-sdk/client-cognito-identity-provider';
import { Playlist } from '@mediashare/media-svc/src/app/modules/playlist/entities/playlist.entity';
import { UpdatePlaylistItemDto } from '@mediashare/media-svc/src/app/modules/playlist-item/dto/update-playlist-item.dto';
import { PlaylistItemDto } from '@mediashare/media-svc/src/app/modules/playlist-item/dto/playlist-item.dto';
import { PlaylistItem } from '@mediashare/media-svc/src/app/modules/playlist-item/entities/playlist-item.entity';
import { MediaItem } from '@mediashare/media-svc/src/app/modules/media-item/entities/media-item.entity'
import { User } from '@mediashare/user-svc/src/app/modules/user/entities/user.entity';

const userApiBaseUrl = `http://localhost:3000/api`;

describe('PlaylistAPI.e2e', () => {
  let app: INestApplication;
  let baseUrl: string;

  let db: DataSource;
  let playlistItemRepository: MongoRepository<PlaylistItem>;
  let playlistRepository: MongoRepository<Playlist>;
  let mediaItemRepository: MongoRepository<MediaItem>;
  let userRepository: MongoRepository<User>;
  let authResponse: AuthenticationResultType;
  let createPlaylistItem;
  let testPlaylistItem;
  let testPlaylistItemId;
  let createUser;
  let testUser;
  let testUserId;
  let createPlaylist;
  let testPlaylist;
  let testPlaylistId;
  let createMediaItem;
  let testMediaItem;
  let testMediaItemId;

  beforeAll(async () => {
    const globalPrefix = 'api'
    app = await initializeApp(globalPrefix);
    baseUrl = await getBaseUrl(app, globalPrefix);

    db = await initializeDB([PlaylistItem, Playlist, MediaItem, User]);
    playlistItemRepository = await db.getMongoRepository(PlaylistItem);
    playlistRepository = await db.getMongoRepository(Playlist);
    mediaItemRepository = await db.getMongoRepository(MediaItem);
    userRepository = await db.getMongoRepository(User);

    // Delete all test records
    await playlistItemRepository.deleteMany({});
  });

  beforeEach(async () => {
    // Delete all test records
    await playlistItemRepository.deleteMany({});
    await playlistRepository.deleteMany({});
    await mediaItemRepository.deleteMany({});
    await userRepository.deleteMany({});
  });

  afterAll(async () => {
    // await app.close();
    await db.close();
  });

  describe('PlaylistAPI should get the playlistItem', () => {
    it('should get the playlistItem', async () => {
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

      // Create a test media item
      const testMediaItemData = {
        key: 'test-key',
        userId: testUserId,
        title: 'Test Media',
        description: 'Test media description',
        uri: 'https://www.example.com',
        visibility: 'public',
      };
      createMediaItem = createMediaItemFunction({ baseUrl, token: authResponse?.IdToken });
      testMediaItem = await createAndValidateTestMediaItem(createMediaItem, testMediaItemData);
      testMediaItemId = getTestMediaItemId(testMediaItem);

      // Create a test playlist
      const testPlaylistData = {
        userId: testUserId,
        title: 'Test Playlist',
        description: 'Test playlist description',
        mediaIds: [testMediaItemId],
        visibility: 'public',
      };
      createPlaylist = createPlaylistFunction({ baseUrl, token: authResponse?.IdToken });
      testPlaylist = await createAndValidateTestPlaylist(createPlaylist, testPlaylistData);
      testPlaylistId = getTestPlaylistId(testPlaylist);

      const testPlaylistItemData = {
        key: 'test-key',
        playlistId: testPlaylistId,
        mediaId: testMediaItemId,
        userId: testUserId,
        title: 'Test Media',
        description: 'Test media description',
        uri: 'https://www.example.com',
        visibility: 'public',
      };
      // Create a corresponding playlistItem in the database
      createPlaylistItem = createPlaylistItemFunction({ baseUrl, token: authResponse?.IdToken });
      testPlaylistItem = await createAndValidateTestPlaylistItem(createPlaylistItem, testPlaylistItemData);
      testPlaylistItemId = getTestPlaylistItemId(testPlaylistItem);

      await axios.get(`${baseUrl}/playlist-items/${testPlaylistItemId}`, defaultOptionsWithBearer(authResponse?.IdToken))
        .then((res) => {
          expect(res.status).toEqual(200);

          const playlistItem: PlaylistItemDto = res.data;
          expect(playlistItem._id).toBeDefined();
          // TODO: This actually returns a profile object with authorId, author, authorImage and authorName
          // TODO: Dates aren't being returned, fix this!
          // expect(playlistItem.createdAt).toBeDefined();
          // expect(playlistItem.updatedDate).toBeDefined();
        })
        .catch((err) => {
          throw err;
          // expect(err).toBeDefined();
          // throwValidationError(errors);
        });
    });
  });

  describe('PlaylistAPI should update the playlistItem', () => {
    it('should update the playlistItem', async () => {
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

      // Create a test media item
      const testMediaItemData = {
        key: 'test-key',
        userId: testUserId,
        title: 'Test Media',
        description: 'Test media description',
        uri: 'https://www.example.com',
        visibility: 'public',
      };
      createMediaItem = createMediaItemFunction({ baseUrl, token: authResponse?.IdToken });
      testMediaItem = await createAndValidateTestMediaItem(createMediaItem, testMediaItemData);
      testMediaItemId = getTestMediaItemId(testMediaItem);

      // Create a test playlist
      const testPlaylistData = {
        userId: testUserId,
        title: 'Test Playlist',
        description: 'Test playlist description',
        mediaIds: [testMediaItemId],
        visibility: 'public',
      };
      createPlaylist = createPlaylistFunction({ baseUrl, token: authResponse?.IdToken });
      testPlaylist = await createAndValidateTestPlaylist(createPlaylist, testPlaylistData);
      testPlaylistId = getTestPlaylistId(testPlaylist);

      const testPlaylistItemData = {
        key: 'test-key',
        playlistId: testPlaylistId,
        mediaId: testMediaItemId,
        userId: testUserId,
        title: 'Test Media',
        description: 'Test media description',
        uri: 'https://www.example.com',
        visibility: 'public',
      };
      // Create a corresponding playlistItem in the database
      createPlaylistItem = createPlaylistItemFunction({ baseUrl, token: authResponse?.IdToken });
      testPlaylistItem = await createAndValidateTestPlaylistItem(createPlaylistItem, testPlaylistItemData);
      testPlaylistItemId = getTestPlaylistItemId(testPlaylistItem);

      const dto = clone(testPlaylistItem) as UpdatePlaylistItemDto;

      await axios.put(`${baseUrl}/playlist-items/${testPlaylistItemId}`, dto, defaultOptionsWithBearer(authResponse?.IdToken))
        .then(async (res) => {
          expect(res.status).toEqual(200);

          const updated: PlaylistItemDto = res.data;
          expect(updated).toBeDefined();
          expect(updated._id).toEqual(testPlaylistItemId);
          expect(updated.createdAt).toEqual(testPlaylistItem.createdAt);
          expect(updated.updatedDate).toBeDefined();
          expect(new Date(updated.updatedDate).getTime()).toBeLessThanOrEqual(new Date(testPlaylistItem.createdAt).getTime());

          // Don't trust the response object - find the playlistItem, and make sure it's updated too
          await axios.get(`${baseUrl}/playlist-items/${testPlaylistItemId}`, defaultOptionsWithBearer(authResponse?.IdToken))
            .then((res) => {
              expect(res.status).toEqual(200);

              const playlistItem: PlaylistItemDto = res.data;
              expect(playlistItem).toBeDefined();
              expect(playlistItem._id).toEqual(testPlaylistItemId);
              // TODO: Should ProfileDto return dates?
              // expect(playlistItem.createdAt).toEqual(testPlaylistItem.createdAt);
              // expect(playlistItem.updatedDate).toBeDefined();
            });
        })
        .catch((err) => {
          throw err;
          // expect(err).toBeDefined();
          // throwValidationError(errors);
        });
    });
  });

  describe('PlaylistAPI should delete the playlistItem', () => {
    it('should delete the playlistItem', async () => {
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

      // Create a test media item
      const testMediaItemData = {
        key: 'test-key',
        userId: testUserId,
        title: 'Test Media',
        description: 'Test media description',
        uri: 'https://www.example.com',
        visibility: 'public',
      };
      createMediaItem = createMediaItemFunction({ baseUrl, token: authResponse?.IdToken });
      testMediaItem = await createAndValidateTestMediaItem(createMediaItem, testMediaItemData);
      testMediaItemId = getTestMediaItemId(testMediaItem);

      // Create a test playlist
      const testPlaylistData = {
        userId: testUserId,
        title: 'Test Playlist',
        description: 'Test playlist description',
        mediaIds: [testMediaItemId],
        visibility: 'public',
      };
      createPlaylist = createPlaylistFunction({ baseUrl, token: authResponse?.IdToken });
      testPlaylist = await createAndValidateTestPlaylist(createPlaylist, testPlaylistData);
      testPlaylistId = getTestPlaylistId(testPlaylist);

      const testPlaylistItemData = {
        key: 'test-key',
        playlistId: testPlaylistId,
        mediaId: testMediaItemId,
        userId: testUserId,
        title: 'Test Media',
        description: 'Test media description',
        uri: 'https://www.example.com',
        visibility: 'public',
      };
      // Create a corresponding playlistItem in the database
      createPlaylistItem = createPlaylistItemFunction({ baseUrl, token: authResponse?.IdToken });
      // TODO: Try a get to make sure the playlistItem is deleted
      testPlaylistItem = await createAndValidateTestPlaylistItem(createPlaylistItem, testPlaylistItemData);
      testPlaylistItemId = getTestPlaylistItemId(testPlaylistItem);

      await axios.delete(`${baseUrl}/playlist-items/${testPlaylistItemId}`, defaultOptionsWithBearer(authResponse?.IdToken))
        .then((res) => {
          // TODO: Make response 204 if no content
          expect(res.status).toEqual(200);
        });
    });
  });
});
