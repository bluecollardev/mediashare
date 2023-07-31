/* Ignore module boundaries, it's just our test scaffolding */
/* eslint-disable @nx/enforce-module-boundaries */
import { Mapper } from '@automapper/core';
import { AuthenticationResultType } from '@aws-sdk/client-cognito-identity-provider';
import { CreateMediaItemDto } from '@mediashare/media-svc/src/app/modules/media-item/dto/create-media-item.dto';
import { UpdateMediaItemDto } from '@mediashare/media-svc/src/app/modules/media-item/dto/update-media-item.dto';
import { MediaItemDto } from '@mediashare/media-svc/src/app/modules/media-item/dto/media-item.dto';
import { MediaItem } from '@mediashare/media-svc/src/app/modules/media-item/entities/media-item.entity';
import { MediaItemDataService, MediaItemService } from '@mediashare/media-svc/src/app/modules/media-item/media-item.service';
import { INestApplication } from '@nestjs/common';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { stub } from 'jest-auto-stub/src/index';
import { PinoLogger } from 'nestjs-pino';
import { clone } from 'remeda';
import { DataSource, MongoRepository } from 'typeorm';
import { getBaseUrl, initializeApp, initializeDB, initializeMapper } from './functions/app';
import { defaultOptionsWithBearer, login } from './functions/auth';
import { createAndValidateTestMediaItem, createMediaItem as createMediaItemFunction, getTestMediaItemId } from './functions/media-item';

describe('MediaItemAPI.current.e2e', () => {
  let app: INestApplication;
  let baseUrl: string;

  let db: DataSource;
  let mediaItemService: MediaItemService;
  let mediaItemRepository: MongoRepository<MediaItem>;
  let mediaItemDataService: MediaItemDataService;
  let mapper: Mapper;
  let authResponse: AuthenticationResultType
  let createMediaItem;
  let testMediaItem;
  let testMediaItemId;

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
  });

  beforeEach(async () => {
    // Delete all test records
    await mediaItemRepository.deleteMany({});
  });

  afterAll(async () => {
    // await app.close();
    await db.close();
  });

  describe('MediaItemAPI should get the current mediaItem', () => {
    it('should get the current mediaItem', async () => {
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

      const testMediaItemData = {
      };
      // Create a corresponding mediaItem in the database
      createMediaItem = createMediaItemFunction({ baseUrl, token: authResponse?.IdToken });
      testMediaItem = await createAndValidateTestMediaItem(createMediaItem, testMediaItemData);
      testMediaItemId = getTestMediaItemId(testMediaItem);

      await axios.get(`${baseUrl}/media-item`, defaultOptionsWithBearer(authResponse?.IdToken))
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

  describe('MediaItemAPI should update the current mediaItem', () => {
    it('should update the current mediaItem', async () => {
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

      const testMediaItemData = {
      };
      // Create a corresponding mediaItem in the database
      createMediaItem = createMediaItemFunction({ baseUrl, token: authResponse?.IdToken });
      testMediaItem = await createAndValidateTestMediaItem(createMediaItem, testMediaItemData);
      testMediaItemId = getTestMediaItemId(testMediaItem);

      const dto = clone(testMediaItem) as UpdateMediaItemDto;

      await axios.put(`${baseUrl}/media-item`, dto, defaultOptionsWithBearer(authResponse?.IdToken))
        .then(async (res) => {
          expect(res.status).toEqual(200);

          const updated: MediaItemDto = res.data;
          expect(updated).toBeDefined();
          expect(updated._id).toEqual(testMediaItemId);
          expect(updated.createdAt).toEqual(testMediaItem.createdAt);
          expect(updated.updatedDate).toBeDefined();
          expect(new Date(updated.updatedDate).getTime()).toBeLessThanOrEqual(new Date(testMediaItem.createdAt).getTime());

          // Don't trust the response object - find the mediaItem, and make sure it's updated too
          await axios.get(`${baseUrl}/media-item`, defaultOptionsWithBearer(authResponse?.IdToken))
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

  describe('MediaItemAPI should delete the current mediaItem', () => {
    it('should delete the current mediaItem', async () => {
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

      const testMediaItemData = {
      };
      // Create a corresponding mediaItem in the database
      createMediaItem = createMediaItemFunction({ baseUrl, token: authResponse?.IdToken });
      // TODO: Try a get to make sure the mediaItem is deleted
      testMediaItem = await createAndValidateTestMediaItem(createMediaItem, testMediaItemData);
      testMediaItemId = getTestMediaItemId(testMediaItem);

      await axios.delete(`${baseUrl}/media-item`, defaultOptionsWithBearer(authResponse?.IdToken))
        .then((res) => {
          // TODO: Make response 204 if no content
          expect(res.status).toEqual(200);
        });
    });
  });
});
