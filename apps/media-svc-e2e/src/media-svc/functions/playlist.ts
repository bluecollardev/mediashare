/* Ignore module boundaries, it's just our test scaffolding */
/* eslint-disable @nx/enforce-module-boundaries */
import axios from 'axios';
import { randomUUID } from 'crypto';
import { ObjectId } from 'mongodb';
import { testAndClonePlaylist } from '../test-components';
import { defaultOptionsWithBearer } from './auth';

import { CreatePlaylistDto } from '@mediashare/media-svc/src/app/modules/playlist/dto/create-playlist.dto';
import { PlaylistDto } from '@mediashare/media-svc/src/app/modules/playlist/dto/playlist.dto';

export const createPlaylist =
  ({ baseUrl, token }) =>
  async (playlist) => {
    const dto = {
      ...playlist,
    } as CreatePlaylistDto;

    return axios.post(
      `${baseUrl}/playlists`,
      dto,
      defaultOptionsWithBearer(token)
    );
  };
export const createAndValidateTestPlaylist = async (
  createPlaylistFn,
  playlistData = {
    // Default data
    userId: new ObjectId().toHexString(),
    title: 'Test Playlist',
    description: 'Test playlist description',
    mediaIds: [],
    visibility: 'public',
  }
) => {
  return new Promise((resolve, reject) => {
    createPlaylistFn(playlistData)
      .then((res) => {
        expect(res.status).toEqual(201);
        const playlist: PlaylistDto = res.data;
        testAndClonePlaylist(playlist, playlistData);
        resolve(playlist);
      })
      .catch((err) => {
        expect(err).toBeDefined();
        reject(err);
      });
  });
};
export const getTestPlaylistId = (testPlaylist) => testPlaylist._id.toString();

export const initializeTestPlaylist = (baseUrl: string, token: string) => async (testUserId: string, testMediaItemId?: string) => {
  const testPlaylistData = {
    userId: testUserId,
    title: 'Test Playlist',
    description: 'Test playlist description',
    mediaIds: testMediaItemId ? [testMediaItemId] : [],
    visibility: 'public',
  };
  const createPlaylistFn = createPlaylist({
    baseUrl,
    token,
  });
  return await createAndValidateTestPlaylist(
    createPlaylistFn,
    testPlaylistData
  );
}
