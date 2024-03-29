/* istanbul ignore file */
import {
  convertUsing,
  createMap,
  forMember,
  ignore,
  Mapper,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import {
  objectIdToStringConverter,
  stringToObjectIdConverter,
} from '@mediashare/core/mappings/converters';
import { Injectable } from '@nestjs/common';
import { PlaylistItem } from '../entities/playlist-item.entity';
import { CreatePlaylistItemDto } from '../dto/create-playlist-item.dto';
import { UpdatePlaylistItemDto } from '../dto/update-playlist-item.dto';
import { PlaylistItemDto } from '../dto/playlist-item.dto';

export const playlistItemToPlaylistItemDtoMappingFactory = (mapper) =>
  createMap(
    mapper,
    PlaylistItem,
    PlaylistItemDto,
    forMember(
      (dest: PlaylistItemDto) => dest._id,
      convertUsing(
        objectIdToStringConverter as never,
        (source: PlaylistItem) => source._id
      )
    ),
    forMember(
      (dest: PlaylistItemDto) => dest.playlistId,
      convertUsing(
        objectIdToStringConverter as never,
        (source: PlaylistItem) => source.playlistId
      )
    ),
    forMember(
      (dest: PlaylistItemDto) => dest.mediaId,
      convertUsing(
        objectIdToStringConverter as never,
        (source: PlaylistItem) => source.mediaId
      )
    )
  );

export const createPlaylistItemDtoToPlaylistItemMappingFactory = (mapper) =>
  createMap(
    mapper,
    CreatePlaylistItemDto,
    PlaylistItem,
    forMember((dest: PlaylistItem) => dest._id, ignore()),
    forMember(
      (dest: PlaylistItem) => dest.playlistId,
      convertUsing(
        stringToObjectIdConverter as never,
        (source: CreatePlaylistItemDto) => source.playlistId
      )
    ),
    forMember(
      (dest: PlaylistItem) => dest.mediaId,
      convertUsing(
        stringToObjectIdConverter as never,
        (source: CreatePlaylistItemDto) => source.mediaId
      )
    )
  );

export const updatePlaylistItemDtoToPlaylistItemMappingFactory = (mapper) =>
  createMap(
    mapper,
    UpdatePlaylistItemDto,
    PlaylistItem,
    forMember(
      (dest: PlaylistItem) => dest._id,
      convertUsing(
        stringToObjectIdConverter as never,
        (source: UpdatePlaylistItemDto) => source._id
      )
    ),
    forMember(
      (dest: PlaylistItem) => dest.playlistId,
      convertUsing(
        stringToObjectIdConverter as never,
        (source: UpdatePlaylistItemDto) => source.playlistId
      )
    ),
    forMember(
      (dest: PlaylistItem) => dest.mediaId,
      convertUsing(
        stringToObjectIdConverter as never,
        (source: UpdatePlaylistItemDto) => source.mediaId
      )
    )
  );

@Injectable()
export class PlaylistItemMapping extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      playlistItemToPlaylistItemDtoMappingFactory(mapper);
      createPlaylistItemDtoToPlaylistItemMappingFactory(mapper);
      updatePlaylistItemDtoToPlaylistItemMappingFactory(mapper);
    };
  }
}
