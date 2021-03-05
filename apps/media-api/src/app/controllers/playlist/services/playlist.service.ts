import { DataService } from '@api';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { PinoLogger } from 'nestjs-pino';
import { MongoRepository } from 'typeorm';
import { mapPlaylistItems } from '../../../modules/playlist-item/functors/map-playlist-item.functor';
import { Playlist } from '../entities/playlist.entity';

import * as R from 'remeda';
import { MediaItem } from '../../media-item/entities/media-item.entity';
@Injectable()
export class PlaylistService extends DataService<Playlist, MongoRepository<Playlist>> {
  constructor(
    @InjectRepository(Playlist)
    repository: MongoRepository<Playlist>,
    logger: PinoLogger
  ) {
    super(repository, logger);
  }

  /**
   * Create a new playlist - optional media Id's
   *
   * @param {ObjectId} userId
   * @param {{ mediaIds: string[] }} opts
   * @return {*}
   * @memberof PlaylistService
   */
  createPlaylist(userId: ObjectId, opts: { mediaIds?: string[]; title?: string } = { title: '' }) {
    const { mediaIds = [], title } = opts;

    const items = mapPlaylistItems(mediaIds, { userId: userId });

    return this.create({ userId, title, items });
  }

  /**
   * Find a playlist by the user's Id
   *
   * @param {string} userIdStr
   * @return {*}
   * @memberof PlaylistService
   */
  async findByUserId(userIdStr: string) {
    const userId = new ObjectId(userIdStr);
    const playlists = await this.repository.find({ userId });

    return playlists;
  }

  findPlaylistsByList(idStrings: ObjectId[]) {
    return this.repository.find({
      where: {
        $or: R.map(idStrings, (id) => ({
          _id: id,
        })),
      },
    });
  }

  async reducePlaylistsToId(playlists: Playlist[]) {
    const mediaIdsTuple = R.pipe(
      playlists,
      R.map((playlist) => playlist.items),
      R.map((playlistItems) => R.map(playlistItems, (item) => item.mediaId))
    );
    const mediaIds = R.reduce(mediaIdsTuple, (prev, curr) => [...prev, ...curr], []);

    return mediaIds;
  }

  async queryPlaylistsById(playlistIds: ObjectId[]) {
    return this.repository.find({
      where: {
        $or: R.map(playlistIds, (id) => ({
          _id: id,
        })),
      },
    });
  }

  mapPlaylists(playlists: Playlist[], mediaItems: MediaItem[]) {
    const indexedMediaItems = R.indexBy(mediaItems, (item) => item._id);

    const mapped = R.map(playlists, (playlist) => ({
      ...playlist,
      mediaItems: playlist?.items.map((item) => indexedMediaItems[item.mediaId.toHexString()]) || [],
    }));

    return mapped;
  }
}
