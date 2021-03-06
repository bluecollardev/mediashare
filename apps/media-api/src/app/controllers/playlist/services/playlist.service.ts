import { DataService } from '@api';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { PinoLogger } from 'nestjs-pino';
import { MongoRepository } from 'typeorm';
import { mapPlaylistItems } from '../../../modules/playlist-item/functors/map-playlist-item.functor';
import { Playlist, PlaylistByUserResponseDto } from '../entities/playlist.entity';

import { PlaylistItemService } from '../../../modules/playlist-item/services/playlist-item.service';
import { PlaylistItem } from '../../../modules/playlist-item/entities/playlist-item.entity';

import * as R from 'remeda';
import { CreatePlaylistDto } from '../dto/create-playlist.dto';
import { ObjectIdParameters, OptionalObjectIdParameters } from '@mediashare/shared';

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
  async createPlaylistWithItems({ userId, mediaIds, title = '' }: CreatePlaylistDto) {
    if (!userId || typeof userId === 'string') throw new Error('userId is string in createPlaylistWithItems');
    const playlist = await this.create({ userId, title });
    const { _id: playlistId } = playlist;

    const playlistItems = await this.createPlaylistItems({
      playlistId,
      items: mapPlaylistItems(mediaIds, { userId, playlistId }),
    });

    return { playlist, playlistItems };
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

  findPlaylistsByList(ObjectIds: ObjectId[]): Promise<PlaylistByUserResponseDto[]> {
    return this.repository
      .aggregate([
        {
          $match: {
            where: {
              $or: R.map(ObjectIds, (id) => ({
                _id: id,
              })),
            },
          },
        },
      ])
      .toArray();
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

  findAll() {
    return this.playlistItemService.aggregatePlaylistAndItem();
  }

  getPlaylistByUserId({ userId }: OptionalObjectIdParameters) {
    return this.playlistItemService.aggregatePlaylistAndItemByIdField({ userId });
  }
  getPlaylistById({ playlistId }: OptionalObjectIdParameters) {
    return this.playlistItemService.aggregatePlaylistAndItemByIdField({
      playlistId,
    });
  }
}
