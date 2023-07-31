/* Ignore module boundaries, it's just our test scaffolding */
/* eslint-disable @nx/enforce-module-boundaries */
import axios from 'axios';
import { randomUUID } from 'crypto';
import { testAndCloneMediaItem } from '../test-components';
import { defaultOptionsWithBearer } from './auth';

import { CreateMediaItemDto } from '@mediashare/media-svc/src/app/modules/media-item/dto/create-media-item.dto';
import { MediaItemDto } from '@mediashare/media-svc/src/app/modules/media-item/dto/media-item.dto';

export const createMediaItem = ({ baseUrl, token }) => (mediaItem) => {
  const dto = {
    sub: randomUUID(),
    ...mediaItem,
  } as CreateMediaItemDto;

  return axios.post(`${baseUrl}/media-item`, dto, defaultOptionsWithBearer(token))
}
export const createAndValidateTestMediaItem = async (createMediaItemFn, mediaItemData = {
  // Default data
  username: 'jsmith',
  email: 'jsmith@example.com',
  firstName: 'John',
  lastName: 'Smith'
}) => {
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
export const getTestMediaItemId = (testMediaItem) => testMediaItem._id.toString();
