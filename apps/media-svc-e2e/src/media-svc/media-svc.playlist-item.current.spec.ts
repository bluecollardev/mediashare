/* Ignore module boundaries, it's just our test scaffolding */
/* eslint-disable @nx/enforce-module-boundaries */
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { clone } from 'remeda';
import { INestApplication } from '@nestjs/common';

import { DataSource, MongoRepository } from 'typeorm';
import { getBaseUrl, initializeApp, initializeDB } from './functions/app';
import { defaultOptionsWithBearer, login } from './functions/auth';
import { createAndValidateTestPlaylistItem, createPlaylistItem as createPlaylistItemFunction, getTestPlaylistItemId } from './functions/playlist-item';

import { AuthenticationResultType } from '@aws-sdk/client-cognito-identity-provider';
import { UpdatePlaylistItemDto } from '@mediashare/media-svc/src/app/modules/playlist-item/dto/update-playlist-item.dto';
import { PlaylistItemDto } from '@mediashare/media-svc/src/app/modules/playlist-item/dto/playlist-item.dto';
import { PlaylistItem } from '@mediashare/media-svc/src/app/modules/playlist-item/entities/playlist-item.entity';

describe('PlaylistAPI.current.e2e', () => {
  let app: INestApplication;
  let baseUrl: string;

  let db: DataSource;
  let playlistItemRepository: MongoRepository<PlaylistItem>;
  let authResponse: AuthenticationResultType
  let createPlaylistItem;
  let testPlaylistItem;
  let testPlaylistItemId;

  beforeAll(async () => {
    const globalPrefix = 'api'
    app = await initializeApp(globalPrefix);
    baseUrl = await getBaseUrl(app, globalPrefix);

    db = await initializeDB([PlaylistItem]);
    playlistItemRepository = await db.getMongoRepository(PlaylistItem);

    // Delete all test records
    await playlistItemRepository.deleteMany({});
  });

  beforeEach(async () => {
    // Delete all test records
    await playlistItemRepository.deleteMany({});
  });

  afterAll(async () => {
    // await app.close();
    await db.close();
  });

  describe('PlaylistAPI should get the current playlistItem', () => {
    it('should get the current playlistItem', async () => {
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

      const testPlaylistItemData = {
      };
      // Create a corresponding playlistItem in the database
      createPlaylistItem = createPlaylistItemFunction({ baseUrl, token: authResponse?.IdToken });
      testPlaylistItem = await createAndValidateTestPlaylistItem(createPlaylistItem, testPlaylistItemData);
      testPlaylistItemId = getTestPlaylistItemId(testPlaylistItem);

      await axios.get(`${baseUrl}/playlist-item`, defaultOptionsWithBearer(authResponse?.IdToken))
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

  describe('PlaylistAPI should update the current playlistItem', () => {
    it('should update the current playlistItem', async () => {
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

      const testPlaylistItemData = {
      };
      // Create a corresponding playlistItem in the database
      createPlaylistItem = createPlaylistItemFunction({ baseUrl, token: authResponse?.IdToken });
      testPlaylistItem = await createAndValidateTestPlaylistItem(createPlaylistItem, testPlaylistItemData);
      testPlaylistItemId = getTestPlaylistItemId(testPlaylistItem);

      const dto = clone(testPlaylistItem) as UpdatePlaylistItemDto;

      await axios.put(`${baseUrl}/playlist-item`, dto, defaultOptionsWithBearer(authResponse?.IdToken))
        .then(async (res) => {
          expect(res.status).toEqual(200);

          const updated: PlaylistItemDto = res.data;
          expect(updated).toBeDefined();
          expect(updated._id).toEqual(testPlaylistItemId);
          expect(updated.createdAt).toEqual(testPlaylistItem.createdAt);
          expect(updated.updatedDate).toBeDefined();
          expect(new Date(updated.updatedDate).getTime()).toBeLessThanOrEqual(new Date(testPlaylistItem.createdAt).getTime());

          // Don't trust the response object - find the playlistItem, and make sure it's updated too
          await axios.get(`${baseUrl}/playlist-item`, defaultOptionsWithBearer(authResponse?.IdToken))
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

  describe('PlaylistAPI should delete the current playlistItem', () => {
    it('should delete the current playlistItem', async () => {
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

      const testPlaylistItemData = {
      };
      // Create a corresponding playlistItem in the database
      createPlaylistItem = createPlaylistItemFunction({ baseUrl, token: authResponse?.IdToken });
      // TODO: Try a get to make sure the playlistItem is deleted
      testPlaylistItem = await createAndValidateTestPlaylistItem(createPlaylistItem, testPlaylistItemData);
      testPlaylistItemId = getTestPlaylistItemId(testPlaylistItem);

      await axios.delete(`${baseUrl}/playlist-item`, defaultOptionsWithBearer(authResponse?.IdToken))
        .then((res) => {
          // TODO: Make response 204 if no content
          expect(res.status).toEqual(200);
        });
    });
  });
});
