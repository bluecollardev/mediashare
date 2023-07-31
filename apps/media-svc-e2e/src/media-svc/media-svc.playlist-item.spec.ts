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
import { CreatePlaylistItemDto } from '@mediashare/media-svc/src/app/modules/playlist-item/dto/create-playlist-item.dto';
import { UpdatePlaylistItemDto } from '@mediashare/media-svc/src/app/modules/playlist-item/dto/update-playlist-item.dto';
import { PlaylistItemDto } from '@mediashare/media-svc/src/app/modules/playlist-item/dto/playlist-item.dto';
import { PlaylistItem } from '@mediashare/media-svc/src/app/modules/playlist-item/entities/playlist-item.entity';
import { PlaylistItemDataService, PlaylistItemService } from '@mediashare/media-svc/src/app/modules/playlist-item/playlist-item.service';
import { createPlaylistItem as createPlaylistItemFunction, createAndValidateTestPlaylistItem, getTestPlaylistItemId } from './functions/playlist-item';

describe('PlaylistAPI.e2e', () => {
  let app: INestApplication;
  let baseUrl: string;

  let db: DataSource;
  let playlistItemService: PlaylistItemService;
  let playlistItemRepository: MongoRepository<PlaylistItem>;
  let playlistItemDataService: PlaylistItemDataService;
  let mapper: Mapper;
  let authResponse: AuthenticationResultType
  let createPlaylistItem;

  beforeAll(async () => {
    const globalPrefix = 'api'
    app = await initializeApp(globalPrefix);
    baseUrl = await getBaseUrl(app, globalPrefix);

    const logger = stub<PinoLogger>();
    mapper = initializeMapper(PlaylistItem, PlaylistItemDto, CreatePlaylistItemDto, UpdatePlaylistItemDto);
    db = await initializeDB([PlaylistItem]);

    playlistItemRepository = await db.getMongoRepository(PlaylistItem);
    playlistItemDataService = new PlaylistItemDataService(playlistItemRepository, logger)
    playlistItemService = new PlaylistItemService(playlistItemDataService, mapper, logger);

    // Delete all test records
    await playlistItemRepository.deleteMany({});

    const creds = {
      playlistItemname: process.env.COGNITO_USER_EMAIL,
      password: process.env.COGNITO_USER_PASSWORD,
      clientId: process.env.COGNITO_CLIENT_ID || '1n3of997k64in850vgp1hn849v',
    };
    authResponse = await login(baseUrl, creds);
    console.log(`Logged in`, authResponse);

    createPlaylistItem = createPlaylistItemFunction({ baseUrl, token: authResponse?.IdToken });
  });

  afterAll(async () => {
    // await app.close();
    await db.close();
  });

  describe('PlaylistAPI validation', () => {
    it('POST /playlistItem should return the correct validation errors', async () => {
      const dto = {

      } as CreatePlaylistItemDto;

      console.log(authResponse?.IdToken);
      await axios.post(`${baseUrl}/playlist-item`, dto, defaultOptionsWithBearer(authResponse?.IdToken))
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
      const playlistItemData = {
        ...junkData,
      };
      createPlaylistItem(playlistItemData)
        .then((res) => {
          expect(res.status).toEqual(201);

          const playlistItem: PlaylistItemDto = res.data;
          expect(playlistItem._id).toBeDefined();
          const junkPlaylistItemKeys = Object.keys(junkData);
          const playlistItemKeys = [ ...Object.keys(playlistItem) ];
          const matches = junkPlaylistItemKeys.reduce((acc, cur) => {
            if (playlistItemKeys.includes(cur)) {
              acc.push(cur);
            }
            return acc;
          }, []);
          expect(matches).toHaveLength(0);
        })
    });
  });


  describe('PlaylistAPI should create, find, update and delete a new playlistItem', () => {
    it('should create a new playlistItem', async () => {
      await createAndValidateTestPlaylistItem(createPlaylistItem);
    });

    it('should get the playlistItem we create', async () => {
      const testPlaylistItem = await createAndValidateTestPlaylistItem(createPlaylistItem);
      const testPlaylistItemId = getTestPlaylistItemId(testPlaylistItem);

      await axios.get(`${baseUrl}/playlist-item/${testPlaylistItemId}`, defaultOptionsWithBearer(authResponse?.IdToken))
        .then((res) => {
          expect(res.status).toEqual(200);

          const playlistItem: PlaylistItemDto = res.data;
          expect(playlistItem._id).toBeDefined();
          // TODO: Fix this, sub is not defined!
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

    it('should update the playlistItem we create', async () => {
      const testPlaylistItem = await createAndValidateTestPlaylistItem(createPlaylistItem) as PlaylistItemDto;
      const testPlaylistItemId = getTestPlaylistItemId(testPlaylistItem);

      const dto = clone(testPlaylistItem) as UpdatePlaylistItemDto;

      await axios.put(`${baseUrl}/playlist-item/${testPlaylistItemId}`, dto, defaultOptionsWithBearer(authResponse?.IdToken))
        .then(async (res) => {
          expect(res.status).toEqual(200);

          const updated: PlaylistItemDto = res.data;
          expect(updated).toBeDefined();
          expect(updated._id).toEqual(testPlaylistItemId);
          expect(updated.createdAt).toEqual(testPlaylistItem.createdAt);
          expect(updated.updatedDate).toBeDefined();

          // Don't trust the response object - find the playlistItem, and make sure it's updated too
          await axios.get(`${baseUrl}/playlist-item/${testPlaylistItemId}`, defaultOptionsWithBearer(authResponse?.IdToken))
            .then((res) => {
              expect(res.status).toEqual(200);

              const playlistItem: PlaylistItemDto = res.data;
              expect(playlistItem).toBeDefined();
            });
        })
        .catch((err) => {
          throw err;
          // expect(err).toBeDefined();
          // throwValidationError(errors);
        });
    });

    it('should delete the playlistItem we created', async () => {
      const testPlaylistItem = await createAndValidateTestPlaylistItem(createPlaylistItem);
      const testPlaylistItemId = getTestPlaylistItemId(testPlaylistItem);

      await axios.delete(`${baseUrl}/playlist-item/${testPlaylistItemId}`, defaultOptionsWithBearer(authResponse?.IdToken))
        .then((res) => {
          // TODO: Make response 204 if no content
          expect(res.status).toEqual(200);
        });
    });
  });
});
