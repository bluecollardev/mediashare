/* istanbul ignore file */
import { convertUsing, createMap, forMember, ignore, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { objectIdToStringConverter, stringToObjectIdConverter } from '@mediashare/core/mappings/converters';
import { Injectable } from '@nestjs/common';
import { ShareItem } from '../entities/share-item.entity';
import { CreateMediaShareItemDto, CreatePlaylistShareItemDto } from '../dto/create-share-item.dto';
import { UpdateMediaShareItemDto, UpdatePlaylistShareItemDto } from '../dto/update-share-item.dto';

export const createMediaShareItemDtoToShareItemMappingFactory = (mapper) => createMap(
  mapper,
  CreateMediaShareItemDto,
  ShareItem,
  forMember((dest: ShareItem) => dest._id, ignore()),
  forMember((dest: ShareItem) => dest.userId, convertUsing(stringToObjectIdConverter as never, (source: CreateMediaShareItemDto) => source.userId)),
  forMember((dest: ShareItem) => dest.playlistId, convertUsing(stringToObjectIdConverter as never, (source: CreateMediaShareItemDto) => source.playlistId)),
  forMember((dest: ShareItem) => dest.mediaId, convertUsing(stringToObjectIdConverter as never, (source: CreateMediaShareItemDto) => source.mediaId)),
);

export const createPlaylistShareItemDtoToShareItemMappingFactory = (mapper) => createMap(
  mapper,
  CreatePlaylistShareItemDto,
  ShareItem,
  forMember((dest: ShareItem) => dest._id, ignore()),
  forMember((dest: ShareItem) => dest.userId, convertUsing(stringToObjectIdConverter as never, (source: CreatePlaylistShareItemDto) => source.userId)),
  forMember((dest: ShareItem) => dest.playlistId, convertUsing(stringToObjectIdConverter as never, (source: CreatePlaylistShareItemDto) => source.playlistId)),
  forMember((dest: ShareItem) => dest.mediaId, convertUsing(stringToObjectIdConverter as never, (source: CreatePlaylistShareItemDto) => source.mediaId)),
);

export const updateMediaShareItemDtoToShareItemMappingFactory = (mapper) => createMap(
  mapper,
  UpdateMediaShareItemDto,
  ShareItem,
  forMember((dest: ShareItem) => dest._id, ignore()),
  forMember((dest: ShareItem) => dest.userId, convertUsing(stringToObjectIdConverter as never, (source: UpdateMediaShareItemDto) => source.userId)),
  forMember((dest: ShareItem) => dest.playlistId, convertUsing(stringToObjectIdConverter as never, (source: UpdateMediaShareItemDto) => source.playlistId)),
  forMember((dest: ShareItem) => dest.mediaId, convertUsing(stringToObjectIdConverter as never, (source: UpdateMediaShareItemDto) => source.mediaId)),
);

export const updatePlaylistShareItemDtoToShareItemMappingFactory = (mapper) => createMap(
  mapper,
  UpdatePlaylistShareItemDto,
  ShareItem,
  forMember((dest: ShareItem) => dest._id, ignore()),
  forMember((dest: ShareItem) => dest.userId, convertUsing(stringToObjectIdConverter as never, (source: UpdatePlaylistShareItemDto) => source.userId)),
  forMember((dest: ShareItem) => dest.playlistId, convertUsing(stringToObjectIdConverter as never, (source: UpdatePlaylistShareItemDto) => source.playlistId)),
  forMember((dest: ShareItem) => dest.mediaId, convertUsing(stringToObjectIdConverter as never, (source: UpdatePlaylistShareItemDto) => source.mediaId)),
);

@Injectable()
export class ShareItemMapping extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      // shareItemToShareItemDtoMappingFactory(mapper);
      createMediaShareItemDtoToShareItemMappingFactory(mapper);
      createPlaylistShareItemDtoToShareItemMappingFactory(mapper);
      updateMediaShareItemDtoToShareItemMappingFactory(mapper);
      updatePlaylistShareItemDtoToShareItemMappingFactory(mapper);
    };
  }
}
