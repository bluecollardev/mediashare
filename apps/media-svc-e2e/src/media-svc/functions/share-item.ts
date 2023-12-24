/* Ignore module boundaries, it's just our test scaffolding */
/* eslint-disable @nx/enforce-module-boundaries */
import axios from 'axios';
import { testAndCloneShareItem } from '../test-components';
import { defaultOptionsWithBearer } from './auth';
import { CreateShareItemDto } from '@mediashare/media-svc/src/app/modules/share-item/dto/create-share-item.dto';
import { ShareItemDto } from '@mediashare/media-svc/src/app/modules/share-item/dto/share-item.dto';

export const createShareItem =
  ({ baseUrl, token }) =>
  async (shareItem) => {
    const dto = {
      ...shareItem,
    } as CreateShareItemDto;

    return axios.post(
      `${baseUrl}/share-items`,
      dto,
      defaultOptionsWithBearer(token)
    );
  };
export const createAndValidateTestShareItem = async (
  createShareItemFn,
  shareItemData = {
    // Default data
  }
) => {
  return new Promise((resolve, reject) => {
    createShareItemFn(shareItemData)
      .then((res) => {
        expect(res.status).toEqual(201);
        const shareItem: ShareItemDto = res.data;
        testAndCloneShareItem(shareItem, shareItemData);
        resolve(shareItem);
      })
      .catch((err) => {
        expect(err).toBeDefined();
        reject(err);
      });
  });
};
export const getTestShareItemId = (testShareItem) =>
  testShareItem._id.toString();

export const initializeTestShareItem =
  (baseUrl: string, token: string) =>
  async (
    testUserId: string,
    testPlaylistId: string,
    testMediaItemId: string
  ) => {
    const testShareItemData = {
      key: 'test-key',
      playlistId: testPlaylistId,
      mediaId: testMediaItemId,
      userId: testUserId,
      title: 'Test Media',
      description: 'Test media description',
      uri: 'https://www.example.com',
      visibility: 'public',
    };
    // Create a corresponding shareItem in the database
    const createShareItemFn = createShareItem({
      baseUrl,
      token,
    });

    let result;
    // eslint-disable-next-line no-useless-catch
    try {
      result = await createAndValidateTestShareItem(
        createShareItemFn,
        testShareItemData
      );
    } catch (err) {
      throw err;
    }

    return result;
  };
