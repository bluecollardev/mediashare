/* Ignore module boundaries, it's just our test scaffolding */
/* eslint-disable @nx/enforce-module-boundaries */
import { Mapper } from '@automapper/core';
import { AuthenticationResultType } from '@aws-sdk/client-cognito-identity-provider';
import { CreatePlaylistDto } from '@mediashare/media-svc/src/app/modules/playlist/dto/create-playlist.dto';
import { UpdatePlaylistDto } from '@mediashare/media-svc/src/app/modules/playlist/dto/update-playlist.dto';
import { PlaylistDto } from '@mediashare/media-svc/src/app/modules/playlist/dto/playlist.dto';
import { Playlist } from '@mediashare/media-svc/src/app/modules/playlist/entities/playlist.entity';
import { PlaylistDataService, PlaylistService } from '@mediashare/media-svc/src/app/modules/playlist/playlist.service';
import { INestApplication } from '@nestjs/common';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { stub } from 'jest-auto-stub/src/index';
import { PinoLogger } from 'nestjs-pino';
import { clone } from 'remeda';
import { DataSource, MongoRepository } from 'typeorm';
import { getBaseUrl, initializeApp, initializeDB, initializeMapper } from './functions/app';
import { defaultOptionsWithBearer, login } from './functions/auth';
import { createAndValidateTestPlaylist, createPlaylist as createPlaylistFunction, getTestPlaylistId } from './functions/playlist';

describe('PlaylistAPI.current.e2e', () => {
  let app: INestApplication;
  let baseUrl: string;

  let db: DataSource;
  let playlistService: PlaylistService;
  let playlistRepository: MongoRepository<Playlist>;
  let playlistDataService: PlaylistDataService;
  let mapper: Mapper;
  let authResponse: AuthenticationResultType
  let createPlaylist;
  let testPlaylist;
  let testPlaylistId;

  beforeAll(async () => {
    const globalPrefix = 'api'
    app = await initializeApp(globalPrefix);
    baseUrl = await getBaseUrl(app, globalPrefix);

    const logger = stub<PinoLogger>();
    mapper = initializeMapper(Playlist, PlaylistDto, CreatePlaylistDto, UpdatePlaylistDto);
    db = await initializeDB([Playlist]);

    playlistRepository = await db.getMongoRepository(Playlist);
    playlistDataService = new PlaylistDataService(playlistRepository, logger)
    playlistService = new PlaylistService(playlistDataService, mapper, logger);

    // Delete all test records
    await playlistRepository.deleteMany({});
  });

  beforeEach(async () => {
    // Delete all test records
    await playlistRepository.deleteMany({});
  });

  afterAll(async () => {
    // await app.close();
    await db.close();
  });

  describe('PlaylistAPI should get the current playlist', () => {
    it('should get the current playlist', async () => {
      // Login first
      const creds = {
        username: process.env.COGNITO_USER_EMAIL,
        password: process.env.COGNITO_USER_PASSWORD,
        clientId: process.env.COGNITO_CLIENT_ID || '1n3of997k64in850vgp1hn849v',
      };
      authResponse = await login(baseUrl, creds);
      console.log(`Logged in`, authResponse);
      // const idToken = jwt.decode(authResponse?.IdToken);
      const token = jwt.decode(authResponse?.IdToken) as any;

      const testPlaylistData = {
      };
      // Create a corresponding playlist in the database
      createPlaylist = createPlaylistFunction({ baseUrl, token: authResponse?.IdToken });
      testPlaylist = await createAndValidateTestPlaylist(createPlaylist, testPlaylistData);
      testPlaylistId = getTestPlaylistId(testPlaylist);

      await axios.get(`${baseUrl}/playlist`, defaultOptionsWithBearer(authResponse?.IdToken))
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

  describe('PlaylistAPI should update the current playlist', () => {
    it('should update the current playlist', async () => {
      // Login first
      const creds = {
        username: process.env.COGNITO_USER_EMAIL,
        password: process.env.COGNITO_USER_PASSWORD,
        clientId: process.env.COGNITO_CLIENT_ID || '1n3of997k64in850vgp1hn849v',
      };
      authResponse = await login(baseUrl, creds);
      console.log(`Logged in`, authResponse);
      // const idToken = jwt.decode(authResponse?.IdToken);
      const token = jwt.decode(authResponse?.IdToken) as any;

      const testPlaylistData = {
      };
      // Create a corresponding playlist in the database
      createPlaylist = createPlaylistFunction({ baseUrl, token: authResponse?.IdToken });
      testPlaylist = await createAndValidateTestPlaylist(createPlaylist, testPlaylistData);
      testPlaylistId = getTestPlaylistId(testPlaylist);

      const dto = clone(testPlaylist) as UpdatePlaylistDto;

      await axios.put(`${baseUrl}/playlist`, dto, defaultOptionsWithBearer(authResponse?.IdToken))
        .then(async (res) => {
          expect(res.status).toEqual(200);

          const updated: PlaylistDto = res.data;
          expect(updated).toBeDefined();
          expect(updated._id).toEqual(testPlaylistId);
          expect(updated.createdAt).toEqual(testPlaylist.createdAt);
          expect(updated.updatedDate).toBeDefined();
          expect(new Date(updated.updatedDate).getTime()).toBeLessThanOrEqual(new Date(testPlaylist.createdAt).getTime());

          // Don't trust the response object - find the playlist, and make sure it's updated too
          await axios.get(`${baseUrl}/playlist`, defaultOptionsWithBearer(authResponse?.IdToken))
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

  describe('PlaylistAPI should delete the current playlist', () => {
    it('should delete the current playlist', async () => {
      // Login first
      const creds = {
        username: process.env.COGNITO_USER_EMAIL,
        password: process.env.COGNITO_USER_PASSWORD,
        clientId: process.env.COGNITO_CLIENT_ID || '1n3of997k64in850vgp1hn849v',
      };
      authResponse = await login(baseUrl, creds);
      console.log(`Logged in`, authResponse);
      // const idToken = jwt.decode(authResponse?.IdToken);
      const token = jwt.decode(authResponse?.IdToken) as any;

      const testPlaylistData = {
      };
      // Create a corresponding playlist in the database
      createPlaylist = createPlaylistFunction({ baseUrl, token: authResponse?.IdToken });
      // TODO: Try a get to make sure the playlist is deleted
      testPlaylist = await createAndValidateTestPlaylist(createPlaylist, testPlaylistData);
      testPlaylistId = getTestPlaylistId(testPlaylist);

      await axios.delete(`${baseUrl}/playlist`, defaultOptionsWithBearer(authResponse?.IdToken))
        .then((res) => {
          // TODO: Make response 204 if no content
          expect(res.status).toEqual(200);
        });
    });
  });
});
