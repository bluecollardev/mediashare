import { DataService } from '@api';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { PinoLogger } from 'nestjs-pino';
import { MongoRepository } from 'typeorm';
import { mapPlaylistItems } from '../../../modules/playlist-item/functors/map-playlist-item.functor';
import { Playlist, PLAYLIST_TOKEN } from '../entities/playlist.entity';

import * as R from 'remeda';
import { MediaItem, MEDIA_TOKEN } from '../../media-item/entities/media-item.entity';
import { PlaylistItemService } from '../../../modules/playlist-item/services/playlist-item.service';
import { PlaylistItem } from '../../../modules/playlist-item/entities/playlist-item.entity';
import { PlaylistResponseDto } from '../entities/playlist-response.dto';
@Injectable()
export class PlaylistService extends DataService<Playlist, MongoRepository<Playlist>> {
  constructor(
    @InjectRepository(Playlist)
    repository: MongoRepository<Playlist>,
    logger: PinoLogger,
    private playlistItemService: PlaylistItemService
  ) {
    super(repository, logger);
  }

  /**
   *
   *
   * @param {{ mediaIds: string[]; userId: ObjectId }} { userId, mediaIds }
   * @memberof PlaylistService
   */
  async createPlaylistWithItems({
    userId,
    mediaIds,
    title = '',
  }: {
    mediaIds: string[];
    userId: ObjectId;
    title?: string;
  }) {
    if (!userId || typeof userId === 'string') throw new Error('userId is string in createPlaylistWithItems');
    const playlist = await this.createPlaylist(userId, { title });
    const { _id: playlistId } = playlist;

    const items = mapPlaylistItems(mediaIds, { userId, playlistId });

    const playlistItems = await this.createPlaylistItems({ playlistId, items });

    return { playlist, playlistId, playlistItems };
  }

  /**
   * Create a new playlist - optional media Id's
   *
   * @param {ObjectId} userId
   * @param {{ mediaIds: string[] }} opts
   * @return {*}
   * @memberof PlaylistService
   */
  createPlaylist(userId: ObjectId, opts: { title?: string } = { title: '' }) {
    const { title } = opts;

    return this.create({ userId, title });
  }

  /**
   *
   *
   * @param {{ playlistId: ObjectId; items: Partial<PlaylistItem>[] }} { playlistId, items }
   * @return {*}
   * @memberof PlaylistService
   */
  createPlaylistItems({ playlistId, items }: { playlistId: ObjectId; items: Partial<PlaylistItem>[] }) {
    if (!items && items.length < 1) throw new Error('no items in createPlaylistItems');
    if (!playlistId || typeof playlistId === 'string') throw new Error('wrong type in createPlaylistItems.id');
    const mappedItems = items.map((item) => ({ ...item, playlistId }));
    return this.playlistItemService.insertMany(mappedItems);
  }

  /**
   * Find a playlist by the user's Id
   *
   * @param {string} userIdStr
   * @return {*}
   * @memberof PlaylistService
   */
  findByUserId(userIdStr: string) {
    const userId = new ObjectId(userIdStr);

    const aggregationQuery = this.repository.aggregate([
      {
        $match: {
          userId,
        },
      },
      {
        $lookup: {
          from: 'playlist_item',
          localField: '_id',
          foreignField: 'playlistId',
          as: 'playlistItems',
        },
      },
    ]);

    return aggregationQuery.toArray();
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
    // const mediaIdsTuple = R.pipe(
    //   playlists,
    //   R.map((playlist) => playlist.items),
    //   R.map((playlistItems) => R.map(playlistItems, (item) => item.mediaId))
    // );
    // const mediaIds = R.reduce(mediaIdsTuple, (prev, curr) => [...prev, ...curr], []);
    // return mediaIds;
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

  aggregatePlaylists(playlistId: ObjectId): Promise<PlaylistResponseDto[]> {
    const query = this.playlistItemService.repository.aggregate([
      {
        $match: { playlistId },
      },
      { $lookup: { from: PLAYLIST_TOKEN, localField: 'playlistId', foreignField: '_id', as: 'playlist' } },

      {
        $lookup: { from: MEDIA_TOKEN, localField: 'mediaId', foreignField: '_id', as: 'mediaItem' },
      },
    ]);
    return query.toArray();
  }

  mapPlaylists(playlists: Playlist[], mediaItems: MediaItem[]) {
    // const indexedMediaItems = R.indexBy(mediaItems, (item) => item._id);
    // const mapped = R.map(playlists, (playlist) => ({
    //   ...playlist,
    //   mediaItems: playlist?.items.map((item) => indexedMediaItems[item.mediaId.toHexString()]) || [],
    // }));
    // return mapped;
  }
}
