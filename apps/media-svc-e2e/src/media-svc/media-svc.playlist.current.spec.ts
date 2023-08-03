/* Ignore module boundaries, it's just our test scaffolding */
/* eslint-disable @nx/enforce-module-boundaries */
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { clone } from 'remeda';
import { INestApplication } from '@nestjs/common';
import { DataSource, MongoRepository } from 'typeorm';
import { AuthenticationResultType } from '@aws-sdk/client-cognito-identity-provider';
import {
  createAndValidateTestUser,
  createUser as createUserFunction, getTestUserId
} from '../../../user-svc-e2e/src/user-svc/functions/user';
import { getBaseUrl, initializeApp, initializeDB } from './functions/app';
import { defaultOptionsWithBearer, login } from './functions/auth';
import { createAndValidateTestPlaylist, createPlaylist as createPlaylistFunction, getTestPlaylistId } from './functions/playlist';
import { UpdatePlaylistDto } from '@mediashare/media-svc/src/app/modules/playlist/dto/update-playlist.dto';
import { PlaylistDto } from '@mediashare/media-svc/src/app/modules/playlist/dto/playlist.dto';
import { Playlist } from '@mediashare/media-svc/src/app/modules/playlist/entities/playlist.entity';
import { User } from '@mediashare/user-svc/src/app/modules/user/entities/user.entity';

const userApiBaseUrl = `http://localhost:3000/api`;

describe('PlaylistAPI.e2e', () => {
  let app: INestApplication;
  let baseUrl: string;

  let db: DataSource;
  let playlistRepository: MongoRepository<Playlist>;
  let userRepository: MongoRepository<User>;
  let authResponse: AuthenticationResultType
  let createPlaylist;
  let testPlaylist;
  let testPlaylistId;
  let createUser;
  let testUser;
  let testUserId;

  beforeAll(async () => {
    const globalPrefix = 'api'
    app = await initializeApp(globalPrefix);
    baseUrl = await getBaseUrl(app, globalPrefix);

    db = await initializeDB([Playlist, User]);
    playlistRepository = await db.getMongoRepository(Playlist);
    userRepository = await db.getMongoRepository(User);

    // Delete all test records
    await playlistRepository.deleteMany({});
  });

  beforeEach(async () => {
    // Delete all test records
    await playlistRepository.deleteMany({});
    await userRepository.deleteMany({});
  });

  afterAll(async () => {
    // await app.close();
    await db.close();
  });

  describe('PlaylistAPI should get the playlist', () => {
    it('should get the playlist', async () => {
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

      const testPlaylistData = {
        userId: new ObjectId().toHexString(),
        title: 'Test Playlist',
        description: 'Test playlist description',
        mediaIds: [],
        visibility: 'public',
      };
      // Create a corresponding playlist in the database
      createPlaylist = createPlaylistFunction({ baseUrl, token: authResponse?.IdToken });
      testPlaylist = await createAndValidateTestPlaylist(createPlaylist, testPlaylistData);
      testPlaylistId = getTestPlaylistId(testPlaylist);

      await axios.get(`${baseUrl}/playlists/${testPlaylistId}`, defaultOptionsWithBearer(authResponse?.IdToken))
        .then((res) => {
          expect(res.status).toEqual(200);

          const playlist: PlaylistDto = res.data;
          expect(playlist._id).toBeDefined();
          // TODO: This actually returns a profile object with authorId, author, authorImage and authorName
          // TODO: Dates aren't being returned, fix this!
          // expect(playlist.createdAt).toBeDefined();
          // expect(playlist.updatedDate).toBeDefined();
        })
        .catch((err) => {
          throw err;
          // expect(err).toBeDefined();
          // throwValidationError(errors);
        });
    });
  });

  describe('PlaylistAPI should update the playlist', () => {
    it('should update the playlist', async () => {
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

      const testPlaylistData = {
        userId: new ObjectId().toHexString(),
        title: 'Test Playlist',
        description: 'Test playlist description',
        mediaIds: [],
        visibility: 'public',
      };
      // Create a corresponding playlist in the database
      createPlaylist = createPlaylistFunction({ baseUrl, token: authResponse?.IdToken });
      testPlaylist = await createAndValidateTestPlaylist(createPlaylist, testPlaylistData);
      testPlaylistId = getTestPlaylistId(testPlaylist);

      const dto = clone(testPlaylist) as UpdatePlaylistDto;

      await axios.put(`${baseUrl}/playlists/${testPlaylistId}`, dto, defaultOptionsWithBearer(authResponse?.IdToken))
        .then(async (res) => {
          expect(res.status).toEqual(200);

          const updated: PlaylistDto = res.data;
          expect(updated).toBeDefined();
          expect(updated._id).toEqual(testPlaylistId);
          expect(updated.createdAt).toEqual(testPlaylist.createdAt);
          expect(updated.updatedDate).toBeDefined();
          expect(new Date(updated.updatedDate).getTime()).toBeLessThanOrEqual(new Date(testPlaylist.createdAt).getTime());

          // Don't trust the response object - find the playlist, and make sure it's updated too
          await axios.get(`${baseUrl}/playlists/${testPlaylistId}`, defaultOptionsWithBearer(authResponse?.IdToken))
            .then((res) => {
              expect(res.status).toEqual(200);

              const playlist: PlaylistDto = res.data;
              expect(playlist).toBeDefined();
              expect(playlist._id).toEqual(testPlaylistId);
              // TODO: Should ProfileDto return dates?
              // expect(playlist.createdAt).toEqual(testPlaylist.createdAt);
              // expect(playlist.updatedDate).toBeDefined();
            });
        })
        .catch((err) => {
          throw err;
          // expect(err).toBeDefined();
          // throwValidationError(errors);
        });
    });
  });

  describe('PlaylistAPI should delete the playlist', () => {
    it('should delete the playlist', async () => {
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

      const testPlaylistData = {
        userId: new ObjectId().toHexString(),
        title: 'Test Playlist',
        description: 'Test playlist description',
        mediaIds: [],
        visibility: 'public',
      };
      // Create a corresponding playlist in the database
      createPlaylist = createPlaylistFunction({ baseUrl, token: authResponse?.IdToken });
      // TODO: Try a get to make sure the playlist is deleted
      testPlaylist = await createAndValidateTestPlaylist(createPlaylist, testPlaylistData);
      testPlaylistId = getTestPlaylistId(testPlaylist);

      await axios.delete(`${baseUrl}/playlists/${testPlaylistId}`, defaultOptionsWithBearer(authResponse?.IdToken))
        .then((res) => {
          // TODO: Make response 204 if no content
          expect(res.status).toEqual(200);
        });
    });
  });
});
