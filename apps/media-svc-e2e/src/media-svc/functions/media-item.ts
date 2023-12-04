/* Ignore module boundaries, it's just our test scaffolding */
/* eslint-disable @nx/enforce-module-boundaries */
import axios from 'axios';
import { ObjectId } from 'mongodb';
import { testAndCloneMediaItem } from '../test-components';
import { defaultOptionsWithBearer } from './auth';
import { CreateMediaItemDto } from '@mediashare/media-svc/src/app/modules/media-item/dto/create-media-item.dto';
import { MediaItemDto } from '@mediashare/media-svc/src/app/modules/media-item/dto/media-item.dto';

export const createMediaItem =
  ({ baseUrl, token }) =>
  async (mediaItem) => {
    const dto = {
      ...mediaItem,
    } as CreateMediaItemDto;

    return axios.post(
      `${baseUrl}/media-items`,
      dto,
      defaultOptionsWithBearer(token)
    );
  };
export const createAndValidateTestMediaItem = async (
  createMediaItemFn,
  mediaItemData = {
    // Default data
    key: 'test-key',
    userId: new ObjectId().toHexString(),
    title: 'Test Media',
    description: 'Test media description',
    uri: 'https://www.example.com',
    visibility: 'public',
  }
) => {
  return new Promise((resolve, reject) => {
    createMediaItemFn(mediaItemData)
      .then((res) => {
        expect(res.status).toEqual(201);
        const mediaItem: MediaItemDto = res.data;
        testAndCloneMediaItem(mediaItem, mediaItemData);
        resolve(mediaItem);
      })
      .catch((err) => {
        expect(err).toBeDefined();
        reject(err);
      });
  });
};
export const getTestMediaItemId = (testMediaItem) =>
  testMediaItem._id.toString();

export const initializeTestMediaItem =
  (baseUrl: string, token: string) => async (testUserId: string) => {
    const testMediaItemData = {
      key: 'test-key',
      userId: testUserId,
      title: 'Test Media',
      description: 'Test media description',
      uri: 'https://www.example.com',
      visibility: 'public',
    };
    // Create a corresponding mediaItem in the database
    const createMediaItemFn = createMediaItem({
      baseUrl,
      token,
    });
    return await createAndValidateTestMediaItem(
      createMediaItemFn,
      testMediaItemData
    );
  };
