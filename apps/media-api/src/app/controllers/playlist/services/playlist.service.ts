import { DataService } from '@api';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { PinoLogger } from 'nestjs-pino';
import { MongoRepository } from 'typeorm';
import { mapPlaylistItem, mapPlaylistItems } from '../../../modules/playlist-item/functors/map-playlist-item.functor';
import { MediaItem } from '../../media-item/entities/media-item.entity';
import { Playlist } from '../entities/playlist.entity';

import * as R from 'remeda';
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

    const items = R.map(mapPlaylistItem(mediaIds), (mediaId) => mediaId.mediaId);

    return this.create({ userId, items, title });
  }
}
