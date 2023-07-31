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
import { CreateMediaItemDto } from '@mediashare/media-svc/src/app/modules/media-item/dto/create-media-item.dto';
import { UpdateMediaItemDto } from '@mediashare/media-svc/src/app/modules/media-item/dto/update-media-item.dto';
import { MediaItemDto } from '@mediashare/media-svc/src/app/modules/media-item/dto/media-item.dto';
import { MediaItem } from '@mediashare/media-svc/src/app/modules/media-item/entities/media-item.entity';
import { MediaItemDataService, MediaItemService } from '@mediashare/media-svc/src/app/modules/media-item/media-item.service';
import { createMediaItem as createMediaItemFunction, createAndValidateTestMediaItem, getTestMediaItemId } from './functions/media-item';

describe('MediaAPI.e2e', () => {
  let app: INestApplication;
  let baseUrl: string;

  let db: DataSource;
  let mediaItemService: MediaItemService;
  let mediaItemRepository: MongoRepository<MediaItem>;
  let mediaItemDataService: MediaItemDataService;
  let mapper: Mapper;
  let authResponse: AuthenticationResultType
  let createMediaItem;

  beforeAll(async () => {
    const globalPrefix = 'api'
    app = await initializeApp(globalPrefix);
    baseUrl = await getBaseUrl(app, globalPrefix);

    const logger = stub<PinoLogger>();
    mapper = initializeMapper(MediaItem, MediaItemDto, CreateMediaItemDto, UpdateMediaItemDto);
    db = await initializeDB([MediaItem]);

    mediaItemRepository = await db.getMongoRepository(MediaItem);
    mediaItemDataService = new MediaItemDataService(mediaItemRepository, logger)
    mediaItemService = new MediaItemService(mediaItemDataService, mapper, logger);

    // Delete all test records
    await mediaItemRepository.deleteMany({});

    const creds = {
      mediaItemname: process.env.COGNITO_USER_EMAIL,
      password: process.env.COGNITO_USER_PASSWORD,
      clientId: process.env.COGNITO_CLIENT_ID || '1n3of997k64in850vgp1hn849v',
    };
    authResponse = await login(baseUrl, creds);
    console.log(`Logged in`, authResponse);

    createMediaItem = createMediaItemFunction({ baseUrl, token: authResponse?.IdToken });
  });

  afterAll(async () => {
    // await app.close();
    await db.close();
  });

  describe('MediaAPI validation', () => {
    it('POST /mediaItem should return the correct validation errors', async () => {
      const dto = {
        firstName: 'J'
      } as CreateMediaItemDto;

      console.log(authResponse?.IdToken);
      await axios.post(`${baseUrl}/mediaItem`, dto, defaultOptionsWithBearer(authResponse?.IdToken))
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
      const mediaItemData = {
        mediaItemname: 'jsmith',
        email: 'jsmith@example.com',
        firstName: 'John',
        lastName: 'Smith',
        ...junkData,
      };
      createMediaItem(mediaItemData)
        .then((res) => {
          expect(res.status).toEqual(201);

          const mediaItem: MediaItemDto = res.data;
          expect(mediaItem._id).toBeDefined();
          const junkMediaItemKeys = Object.keys(junkData);
          const mediaItemKeys = [ ...Object.keys(mediaItem) ];
          const matches = junkMediaItemKeys.reduce((acc, cur) => {
            if (mediaItemKeys.includes(cur)) {
              acc.push(cur);
            }
            return acc;
          }, []);
          expect(matches).toHaveLength(0);
        })
    });
  });


  describe('MediaAPI should create, find, update and delete a new mediaItem', () => {
    it('should create a new mediaItem', async () => {
      await createAndValidateTestMediaItem(createMediaItem);
    });

    it('should get the mediaItem we create', async () => {
      const testMediaItem = await createAndValidateTestMediaItem(createMediaItem);
      const testMediaItemId = getTestMediaItemId(testMediaItem);

      await axios.get(`${baseUrl}/media-item/${testMediaItemId}`, defaultOptionsWithBearer(authResponse?.IdToken))
        .then((res) => {
          expect(res.status).toEqual(200);

          const mediaItem: MediaItemDto = res.data;
          expect(mediaItem._id).toBeDefined();
          // TODO: Fix this, sub is not defined!
          // expect(mediaItem.sub).toBeDefined();
          expect(mediaItem.mediaItemname).toEqual('jsmith');
          expect(mediaItem.email).toEqual('jsmith@example.com');
          expect(mediaItem.firstName).toEqual('John');
          expect(mediaItem.lastName).toEqual('Smith');
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

    it('should update the mediaItem we create', async () => {
      const testMediaItem = await createAndValidateTestMediaItem(createMediaItem) as MediaItemDto;
      const testMediaItemId = getTestMediaItemId(testMediaItem);

      const dto = clone(testMediaItem) as UpdateMediaItemDto;
      dto.mediaItemname = 'jr.smith';
      dto.email = 'jr.smith@example.com';

      await axios.put(`${baseUrl}/media-item/${testMediaItemId}`, dto, defaultOptionsWithBearer(authResponse?.IdToken))
        .then(async (res) => {
          expect(res.status).toEqual(200);

          const updated: MediaItemDto = res.data;
          expect(updated).toBeDefined();
          expect(updated._id).toEqual(testMediaItemId);
          expect(updated.sub).toBeDefined();
          expect(updated.mediaItemname).toEqual('jr.smith');
          expect(updated.email).toEqual('jr.smith@example.com');
          expect(updated.firstName).toEqual('John');
          expect(updated.lastName).toEqual('Smith');
          expect(updated.createdAt).toEqual(testMediaItem.createdAt);
          expect(updated.updatedDate).toBeDefined();

          // Don't trust the response object - find the mediaItem, and make sure it's updated too
          await axios.get(`${baseUrl}/media-item/${testMediaItemId}`, defaultOptionsWithBearer(authResponse?.IdToken))
            .then((res) => {
              expect(res.status).toEqual(200);

              const mediaItem: MediaItemDto = res.data;
              expect(mediaItem).toBeDefined();
              expect(mediaItem.sub).toBeUndefined();
              expect(mediaItem.mediaItemname).toEqual('jr.smith');
              expect(mediaItem.email).toEqual('jr.smith@example.com');
              expect(mediaItem.firstName).toEqual('John');
              expect(mediaItem.lastName).toEqual('Smith');
            });
        })
        .catch((err) => {
          throw err;
          // expect(err).toBeDefined();
          // throwValidationError(errors);
        });
    });

    it('should delete the mediaItem we created', async () => {
      const testMediaItem = await createAndValidateTestMediaItem(createMediaItem);
      const testMediaItemId = getTestMediaItemId(testMediaItem);

      await axios.delete(`${baseUrl}/media-item/${testMediaItemId}`, defaultOptionsWithBearer(authResponse?.IdToken))
        .then((res) => {
          // TODO: Make response 204 if no content
          expect(res.status).toEqual(200);
        });
    });
  });
});
