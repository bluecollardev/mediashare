/* istanbul ignore file */
import {
  convertUsing,
  createMap,
  forMember,
  ignore,
  Mapper,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { stringToObjectIdConverter } from '@mediashare/core/mappings/converters';
import { Injectable } from '@nestjs/common';
import { FlaggedItem } from '../entities/flagged-item.entity';
import {
  MediaFlaggedItemDto,
  PlaylistFlaggedItemDto,
} from '../dto/flagged-item.dto';
import {
  CreateMediaFlaggedItemDto,
  CreatePlaylistFlaggedItemDto,
} from '../dto/create-flagged-item.dto';
import {
  UpdateMediaFlaggedItemDto,
  UpdatePlaylistFlaggedItemDto,
} from '../dto/update-flagged-item.dto';

export const flaggedItemToMediaFlaggedItemDtoMappingFactory = (mapper) =>
  createMap(
    mapper,
    FlaggedItem,
    MediaFlaggedItemDto,
    forMember((dest: MediaFlaggedItemDto) => dest._id, ignore()),
    forMember(
      (dest: MediaFlaggedItemDto) => dest.mediaId,
      convertUsing(
        stringToObjectIdConverter as never,
        (source: FlaggedItem) => source.mediaId
      )
    ),
    forMember(
      (dest: MediaFlaggedItemDto) => dest.playlistId,
      convertUsing(
        stringToObjectIdConverter as never,
        (source: FlaggedItem) => source.playlistId
      )
    )
  );

export const flaggedItemToPlaylistFlaggedItemDtoMappingFactory = (mapper) =>
  createMap(
    mapper,
    FlaggedItem,
    PlaylistFlaggedItemDto,
    forMember((dest: PlaylistFlaggedItemDto) => dest._id, ignore()),
    forMember(
      (dest: PlaylistFlaggedItemDto) => dest.mediaId,
      convertUsing(
        stringToObjectIdConverter as never,
        (source: FlaggedItem) => source.mediaId
      )
    ),
    forMember(
      (dest: PlaylistFlaggedItemDto) => dest.playlistId,
      convertUsing(
        stringToObjectIdConverter as never,
        (source: FlaggedItem) => source.playlistId
      )
    )
  );

export const createMediaFlaggedItemDtoToFlaggedItemMappingFactory = (mapper) =>
  createMap(
    mapper,
    CreateMediaFlaggedItemDto,
    FlaggedItem,
    // forMember((dest: FlaggedItem) => dest._id, ignore()),
    forMember(
      (dest: FlaggedItem) => dest.mediaId,
      convertUsing(
        stringToObjectIdConverter as never,
        (source: CreateMediaFlaggedItemDto) => source.mediaId
      )
    ),
    forMember((dest: FlaggedItem) => dest.playlistId, ignore())
  );

export const createPlaylistFlaggedItemDtoToFlaggedItemMappingFactory = (
  mapper
) =>
  createMap(
    mapper,
    CreatePlaylistFlaggedItemDto,
    FlaggedItem,
    forMember((dest: FlaggedItem) => dest._id, ignore()),
    forMember(
      (dest: FlaggedItem) => dest.playlistId,
      convertUsing(
        stringToObjectIdConverter as never,
        (source: CreatePlaylistFlaggedItemDto) => source.playlistId
      )
    ),
    forMember((dest: FlaggedItem) => dest.mediaId, ignore())
  );

export const updateMediaFlaggedItemDtoToFlaggedItemMappingFactory = (mapper) =>
  createMap(
    mapper,
    UpdateMediaFlaggedItemDto,
    FlaggedItem,
    forMember(
      (dest: FlaggedItem) => dest._id,
      convertUsing(
        stringToObjectIdConverter as never,
        (source: UpdateMediaFlaggedItemDto) => source._id
      )
    )
  );

export const updatePlaylistFlaggedItemDtoToFlaggedItemMappingFactory = (
  mapper
) =>
  createMap(
    mapper,
    UpdatePlaylistFlaggedItemDto,
    FlaggedItem,
    forMember(
      (dest: FlaggedItem) => dest._id,
      convertUsing(
        stringToObjectIdConverter as never,
        (source: UpdatePlaylistFlaggedItemDto) => source._id
      )
    )
  );

@Injectable()
export class FlaggedItemMapping extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      // flaggedItemToFlaggedItemDtoMappingFactory(mapper);
      flaggedItemToMediaFlaggedItemDtoMappingFactory(mapper);
      flaggedItemToPlaylistFlaggedItemDtoMappingFactory(mapper);
      createMediaFlaggedItemDtoToFlaggedItemMappingFactory(mapper);
      createPlaylistFlaggedItemDtoToFlaggedItemMappingFactory(mapper);
      updateMediaFlaggedItemDtoToFlaggedItemMappingFactory(mapper);
      updatePlaylistFlaggedItemDtoToFlaggedItemMappingFactory(mapper);
    };
  }
}
