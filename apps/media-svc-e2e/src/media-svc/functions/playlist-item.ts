/* Ignore module boundaries, it's just our test scaffolding */
/* eslint-disable @nx/enforce-module-boundaries */
import axios from 'axios';
import { randomUUID } from 'crypto';
import { testAndClonePlaylistItem } from '../test-components';
import { defaultOptionsWithBearer } from './auth';

import { CreatePlaylistItemDto } from '@mediashare/media-svc/src/app/modules/playlist-item/dto/create-playlist-item.dto';
import { PlaylistItemDto } from '@mediashare/media-svc/src/app/modules/playlist-item/dto/playlist-item.dto';

export const createPlaylistItem = ({ baseUrl, token }) => (playlistItem) => {
  const dto = {
    sub: randomUUID(),
    ...playlistItem,
  } as CreatePlaylistItemDto;

  return axios.post(`${baseUrl}/playlist-items`, dto, defaultOptionsWithBearer(token))
}
export const createAndValidateTestPlaylistItem = async (createPlaylistItemFn, playlistItemData = {
  // Default data
}) => {
  return new Promise((resolve, reject) => {
    createPlaylistItemFn(playlistItemData)
      .then((res) => {
        expect(res.status).toEqual(201);
        const playlistItem: PlaylistItemDto = res.data;
        testAndClonePlaylistItem(playlistItem, playlistItemData);
        resolve(playlistItem);
      })
      .catch((err) => {
        expect(err).toBeDefined();
        reject(err);
      });
  });
};
export const getTestPlaylistItemId = (testPlaylistItem) => testPlaylistItem._id.toString();
