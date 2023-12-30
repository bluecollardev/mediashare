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
import { ShareItem } from '../entities/share-item.entity';
import { MediaShareItemDto, PlaylistShareItemDto } from '../dto/share-item.dto';
import {
  CreateMediaShareItemDto,
  CreatePlaylistShareItemDto,
} from '../dto/create-share-item.dto';
import {
  UpdateMediaShareItemDto,
  UpdatePlaylistShareItemDto,
} from '../dto/update-share-item.dto';

export const shareItemToMediaShareItemDtoMappingFactory = (mapper) =>
  createMap(
    mapper,
    ShareItem,
    MediaShareItemDto,
    forMember((dest: MediaShareItemDto) => dest._id, ignore()),
    forMember(
      (dest: MediaShareItemDto) => dest.mediaId,
      convertUsing(
        stringToObjectIdConverter as never,
        (source: ShareItem) => source.mediaId
      )
    ),
    forMember(
      (dest: MediaShareItemDto) => dest.playlistId,
      convertUsing(
        stringToObjectIdConverter as never,
        (source: ShareItem) => source.playlistId
      )
    )
  );

export const shareItemToPlaylistShareItemDtoMappingFactory = (mapper) =>
  createMap(
    mapper,
    ShareItem,
    PlaylistShareItemDto,
    forMember((dest: PlaylistShareItemDto) => dest._id, ignore()),
    forMember(
      (dest: PlaylistShareItemDto) => dest.mediaId,
      convertUsing(
        stringToObjectIdConverter as never,
        (source: ShareItem) => source.mediaId
      )
    ),
    forMember(
      (dest: PlaylistShareItemDto) => dest.playlistId,
      convertUsing(
        stringToObjectIdConverter as never,
        (source: ShareItem) => source.playlistId
      )
    )
  );

export const createMediaShareItemDtoToShareItemMappingFactory = (mapper) =>
  createMap(
    mapper,
    CreateMediaShareItemDto,
    ShareItem,
    // forMember((dest: ShareItem) => dest._id, ignore()),
    forMember(
      (dest: ShareItem) => dest.mediaId,
      convertUsing(
        stringToObjectIdConverter as never,
        (source: CreateMediaShareItemDto) => source.mediaId
      )
    ),
    forMember((dest: ShareItem) => dest.playlistId, ignore())
  );

export const createPlaylistShareItemDtoToShareItemMappingFactory = (mapper) =>
  createMap(
    mapper,
    CreatePlaylistShareItemDto,
    ShareItem,
    forMember((dest: ShareItem) => dest._id, ignore()),
    forMember(
      (dest: ShareItem) => dest.playlistId,
      convertUsing(
        stringToObjectIdConverter as never,
        (source: CreatePlaylistShareItemDto) => source.playlistId
      )
    ),
    forMember((dest: ShareItem) => dest.mediaId, ignore())
  );

export const updateMediaShareItemDtoToShareItemMappingFactory = (mapper) =>
  createMap(
    mapper,
    UpdateMediaShareItemDto,
    ShareItem,
    forMember(
      (dest: ShareItem) => dest._id,
      convertUsing(
        stringToObjectIdConverter as never,
        (source: UpdateMediaShareItemDto) => source._id
      )
    )
  );

export const updatePlaylistShareItemDtoToShareItemMappingFactory = (mapper) =>
  createMap(
    mapper,
    UpdatePlaylistShareItemDto,
    ShareItem,
    forMember(
      (dest: ShareItem) => dest._id,
      convertUsing(
        stringToObjectIdConverter as never,
        (source: UpdatePlaylistShareItemDto) => source._id
      )
    )
  );

@Injectable()
export class ShareItemMapping extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      // shareItemToShareItemDtoMappingFactory(mapper);
      shareItemToMediaShareItemDtoMappingFactory(mapper);
      shareItemToPlaylistShareItemDtoMappingFactory(mapper);
      createMediaShareItemDtoToShareItemMappingFactory(mapper);
      createPlaylistShareItemDtoToShareItemMappingFactory(mapper);
      updateMediaShareItemDtoToShareItemMappingFactory(mapper);
      updatePlaylistShareItemDtoToShareItemMappingFactory(mapper);
    };
  }
}
