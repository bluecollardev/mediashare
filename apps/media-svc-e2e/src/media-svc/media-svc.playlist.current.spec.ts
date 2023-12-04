/* Ignore module boundaries, it's just our test scaffolding */
/* eslint-disable @nx/enforce-module-boundaries */
import axios from 'axios';
import { clone } from 'remeda';
import { INestApplication } from '@nestjs/common';
import { DataSource, MongoRepository } from 'typeorm';
import { AuthenticationResultType } from '@aws-sdk/client-cognito-identity-provider';
import {
  getTestUserId, initializeTestUser
} from './functions/user';
import { getBaseUrl, initializeApp, initializeDB } from './functions/app';
import { defaultOptionsWithBearer } from './functions/auth';
import {
  getTestPlaylistId, initializeTestPlaylist
} from './functions/playlist';
import { UpdatePlaylistDto } from '@mediashare/media-svc/src/app/modules/playlist/dto/update-playlist.dto';
import { PlaylistDto } from '@mediashare/media-svc/src/app/modules/playlist/dto/playlist.dto';
import { Playlist } from '@mediashare/media-svc/src/app/modules/playlist/entities/playlist.entity';
import { User } from '@mediashare/user-svc/src/app/modules/user/entities/user.entity';
import { initializeApp as initializeUserApi } from '@mediashare/user-svc-e2e/src/user-svc/functions/app';

describe('PlaylistAPI.e2e', () => {
  let app: INestApplication;
  let baseUrl: string;
  let userApi: INestApplication;
  let userApiBaseUrl: string;

  let db: DataSource;
  let playlistRepository: MongoRepository<Playlist>;
  let userRepository: MongoRepository<User>;
  let authResponse: AuthenticationResultType;
  let testPlaylist;
  let testPlaylistId;
  let testUser;
  let testUserId;

  beforeAll(async () => {
    const globalPrefix = 'api';
    app = await initializeApp(globalPrefix);
    baseUrl = await getBaseUrl(app, globalPrefix);

    userApi = await initializeUserApi(globalPrefix);
    userApiBaseUrl = await getBaseUrl(userApi, globalPrefix);

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
      [testUser, authResponse] = await initializeTestUser(baseUrl, userApiBaseUrl);
      testUserId = getTestUserId(testUser);

      testPlaylist = await initializeTestPlaylist(baseUrl, authResponse?.IdToken)(testUserId);
      testPlaylistId = getTestPlaylistId(testPlaylist);

      await axios
        .get(
          `${baseUrl}/playlists/${testPlaylistId}`,
          defaultOptionsWithBearer(authResponse?.IdToken)
        )
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
      [testUser, authResponse] = await initializeTestUser(baseUrl, userApiBaseUrl);
      testUserId = getTestUserId(testUser);

      testPlaylist = await initializeTestPlaylist(baseUrl, authResponse?.IdToken)(testUserId);
      testPlaylistId = getTestPlaylistId(testPlaylist);

      const dto = clone(testPlaylist) as UpdatePlaylistDto;

      await axios
        .put(
          `${baseUrl}/playlists/${testPlaylistId}`,
          dto,
          defaultOptionsWithBearer(authResponse?.IdToken)
        )
        .then(async (res) => {
          expect(res.status).toEqual(200);

          const updated: PlaylistDto = res.data;
          expect(updated).toBeDefined();
          expect(updated._id).toEqual(testPlaylistId);
          expect(updated.createdAt).toEqual(testPlaylist.createdAt);
          expect(updated.updatedDate).toBeDefined();
          expect(new Date(updated.updatedDate).getTime()).toBeLessThanOrEqual(
            new Date(testPlaylist.createdAt).getTime()
          );

          // Don't trust the response object - find the playlist, and make sure it's updated too
          await axios
            .get(
              `${baseUrl}/playlists/${testPlaylistId}`,
              defaultOptionsWithBearer(authResponse?.IdToken)
            )
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
      [testUser, authResponse] = await initializeTestUser(baseUrl, userApiBaseUrl);
      testUserId = getTestUserId(testUser);

      testPlaylist = await initializeTestPlaylist(baseUrl, authResponse?.IdToken)(testUserId);
      testPlaylistId = getTestPlaylistId(testPlaylist);

      await axios
        .delete(
          `${baseUrl}/playlists/${testPlaylistId}`,
          defaultOptionsWithBearer(authResponse?.IdToken)
        )
        .then((res) => {
          // TODO: Make response 204 if no content
          expect(res.status).toEqual(200);
        });
    });
  });
});
