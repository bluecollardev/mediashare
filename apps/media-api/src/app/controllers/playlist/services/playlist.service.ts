import { DataService } from '@api';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { PinoLogger } from 'nestjs-pino';
import { MongoRepository } from 'typeorm';
import { mapPlaylistItems } from '../../../modules/playlist-item/functors/map-playlist-item.functor';
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

    const items = mapPlaylistItems(mediaIds, { userId: userId });

    return this.create({ userId, items, title });
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
}
