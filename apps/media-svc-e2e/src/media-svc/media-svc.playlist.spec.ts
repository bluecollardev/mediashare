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

import { AuthenticationResultType } from '@aws-sdk/client-cognito-identity-provider';
import { ApiErrorResponse } from '@mediashare/core/errors/api-error';
import { CreatePlaylistDto } from '@mediashare/media-svc/src/app/modules/playlist/dto/create-playlist.dto';
import { UpdatePlaylistDto } from '@mediashare/media-svc/src/app/modules/playlist/dto/update-playlist.dto';
import { PlaylistDto } from '@mediashare/media-svc/src/app/modules/playlist/dto/playlist.dto';
import { Playlist } from '@mediashare/media-svc/src/app/modules/playlist/entities/playlist.entity';
import { PlaylistDataService, PlaylistService } from '@mediashare/media-svc/src/app/modules/playlist/playlist.service';
import { createPlaylist as createPlaylistFunction, createAndValidateTestPlaylist, getTestPlaylistId } from './functions/playlist';

describe('PlaylistAPI.e2e', () => {
  let app: INestApplication;
  let baseUrl: string;

  let db: DataSource;
  let playlistService: PlaylistService;
  let playlistRepository: MongoRepository<Playlist>;
  let playlistDataService: PlaylistDataService;
  let mapper: Mapper;
  let authResponse: AuthenticationResultType
  let createPlaylist;

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

    const creds = {
      playlistname: process.env.COGNITO_USER_EMAIL,
      password: process.env.COGNITO_USER_PASSWORD,
      clientId: process.env.COGNITO_CLIENT_ID || '1n3of997k64in850vgp1hn849v',
    };
    authResponse = await login(baseUrl, creds);
    console.log(`Logged in`, authResponse);

    createPlaylist = createPlaylistFunction({ baseUrl, token: authResponse?.IdToken });
  });

  afterAll(async () => {
    // await app.close();
    await db.close();
  });

  describe('PlaylistAPI validation', () => {
    it('POST /playlist should return the correct validation errors', async () => {
      const dto = {

      } as CreatePlaylistDto;

      console.log(authResponse?.IdToken);
      await axios.post(`${baseUrl}/playlist-`, dto, defaultOptionsWithBearer(authResponse?.IdToken))
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
      }
      const playlistData = {
        ...junkData,
      };
      createPlaylist(playlistData)
        .then((res) => {
          expect(res.status).toEqual(201);

          const playlist: PlaylistDto = res.data;
          expect(playlist._id).toBeDefined();
          const junkPlaylistKeys = Object.keys(junkData);
          const playlistKeys = [ ...Object.keys(playlist) ];
          const matches = junkPlaylistKeys.reduce((acc, cur) => {
            if (playlistKeys.includes(cur)) {
              acc.push(cur);
            }
            return acc;
          }, []);
          expect(matches).toHaveLength(0);
        })
    });
  });


  describe('PlaylistAPI should create, find, update and delete a new playlist', () => {
    it('should create a new playlist', async () => {
      await createAndValidateTestPlaylist(createPlaylist);
    });

    it('should get the playlist we create', async () => {
      const testPlaylist = await createAndValidateTestPlaylist(createPlaylist);
      const testPlaylistId = getTestPlaylistId(testPlaylist);

      await axios.get(`${baseUrl}/playlist/${testPlaylistId}`, defaultOptionsWithBearer(authResponse?.IdToken))
        .then((res) => {
          expect(res.status).toEqual(200);

          const playlist: PlaylistDto = res.data;
          expect(playlist._id).toBeDefined();
          // TODO: Fix this, sub is not defined!
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

    it('should update the playlist we create', async () => {
      const testPlaylist = await createAndValidateTestPlaylist(createPlaylist) as PlaylistDto;
      const testPlaylistId = getTestPlaylistId(testPlaylist);

      const dto = clone(testPlaylist) as UpdatePlaylistDto;

      await axios.put(`${baseUrl}/playlist/${testPlaylistId}`, dto, defaultOptionsWithBearer(authResponse?.IdToken))
        .then(async (res) => {
          expect(res.status).toEqual(200);

          const updated: PlaylistDto = res.data;
          expect(updated).toBeDefined();
          expect(updated._id).toEqual(testPlaylistId);
          expect(updated.createdAt).toEqual(testPlaylist.createdAt);
          expect(updated.updatedDate).toBeDefined();

          // Don't trust the response object - find the playlist, and make sure it's updated too
          await axios.get(`${baseUrl}/playlist/${testPlaylistId}`, defaultOptionsWithBearer(authResponse?.IdToken))
            .then((res) => {
              expect(res.status).toEqual(200);

              const playlist: PlaylistDto = res.data;
              expect(playlist).toBeDefined();
            });
        })
        .catch((err) => {
          throw err;
          // expect(err).toBeDefined();
          // throwValidationError(errors);
        });
    });

    it('should delete the playlist we created', async () => {
      const testPlaylist = await createAndValidateTestPlaylist(createPlaylist);
      const testPlaylistId = getTestPlaylistId(testPlaylist);

      await axios.delete(`${baseUrl}/playlist/${testPlaylistId}`, defaultOptionsWithBearer(authResponse?.IdToken))
        .then((res) => {
          // TODO: Make response 204 if no content
          expect(res.status).toEqual(200);
        });
    });
  });
});
