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
import { MediaItem } from '../entities/media-item.entity';
import { CreateMediaItemDto } from '../dto/create-media-item.dto';
import { UpdateMediaItemDto } from '../dto/update-media-item.dto';
import { MediaItemDto } from '../dto/media-item.dto';

export const mediaItemToMediaItemDtoMappingFactory = (mapper) =>
  createMap(
    mapper,
    MediaItem,
    MediaItemDto,
    forMember(
      (dest: MediaItemDto) => dest._id,
      convertUsing(
        objectIdToStringConverter as never,
        (source: MediaItem) => source._id
      )
    )
  );

export const createMediaItemDtoToMediaItemMappingFactory = (mapper) =>
  createMap(
    mapper,
    CreateMediaItemDto,
    MediaItem,
    forMember((dest: MediaItem) => dest._id, ignore())
  );

export const updateMediaItemDtoToMediaItemMappingFactory = (mapper) =>
  createMap(
    mapper,
    UpdateMediaItemDto,
    MediaItem,
    forMember(
      (dest: MediaItem) => dest._id,
      convertUsing(
        stringToObjectIdConverter as never,
        (source: MediaItemDto) => source._id
      )
    )
  );

@Injectable()
export class MediaItemMapping extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      mediaItemToMediaItemDtoMappingFactory(mapper);
      createMediaItemDtoToMediaItemMappingFactory(mapper);
      updateMediaItemDtoToMediaItemMappingFactory(mapper);
    };
  }
}
