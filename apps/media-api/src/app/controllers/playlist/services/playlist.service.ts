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

import { OptionalObjectIdParameters } from '@mediashare/shared';
import { UserService } from '../../../modules/auth/user.service';

type CreatePlaylistParameters = {
  playlistId: ObjectId;
  items: string[];
  createdBy: ObjectId;
};
@Injectable()
export class PlaylistService extends DataService<Playlist, MongoRepository<Playlist>> {
  constructor(
    @InjectRepository(Playlist)
    repository: MongoRepository<Playlist>,
    logger: PinoLogger,
    private userService: UserService,
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
  async createPlaylistWithItems({ createdBy, userId, mediaIds, title = '' }: CreatePlaylistDto) {
    const userIdAsObjectId = new ObjectId(userId);

    const playlist = await this.create({ userId: userIdAsObjectId, title, createdBy, mediaIds });

    const { _id: playlistId } = playlist;

    // const playlistItems = await this.createPlaylistItems({
    //   playlistId,
    //   createdBy,
    //   items: [...mediaIds]
    // });

    return { playlist };
  }

  /**
   *
   *
   * @param {{ playlistId: ObjectId; items: Partial<PlaylistItem>[] }} { playlistId, items }
   * @return {*}
   * @memberof PlaylistService
   */
  createPlaylistItems({ playlistId, items, createdBy }: CreatePlaylistParameters) {
    if (!playlistId || typeof playlistId === 'string') throw new Error('wrong type in createPlaylistItems.id');

    const mappedItems = items.map((item) => ({ item, playlistId, createdBy }));

    return this.playlistItemService.insertMany(mappedItems);
  }

  findPlaylistsByList(ObjectIds: ObjectId[]): Promise<PlaylistByUserResponseDto[]> {
    return this.repository
      .aggregate([
        {
          $match: {
            where: {
              $or: R.map(ObjectIds, (id) => ({
                _id: id
              }))
            }
          }
        }
      ])
      .toArray();
  }

  async queryPlaylistsById(playlistIds: ObjectId[]) {
    return this.repository.find({
      where: {
        $or: R.map(playlistIds, (id) => ({
          _id: id
        }))
      }
    });
  }

  /* FIXME: hack-around for getting a user when one doesn't exist */
  async getPlaylistByUserId({ userId }: OptionalObjectIdParameters = { userId: null }) {
    if (userId === null || !userId) {
      const defaultUsername = 'admin@example.com';
      const user = await this.userService.findByQuery({ username: defaultUsername });
      return await this.playlistItemService.aggregatePlaylistAndItemByIdField({ userId: user._id });
    }
    return await this.findAllByQuery({ userId });
  }
  getPlaylistById({ playlistId }: OptionalObjectIdParameters) {
    return this.playlistItemService.aggregatePlaylistAndItemByIdField({
      playlistId
    });
  }

  findall() {
    return this.playlistItemService.findAll();
  }
}
