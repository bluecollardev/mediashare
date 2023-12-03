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
import { Playlist } from '../entities/playlist.entity';
import { CreatePlaylistDto } from '../dto/create-playlist.dto';
import { UpdatePlaylistDto } from '../dto/update-playlist.dto';
import { PlaylistDto } from '../dto/playlist.dto';

export const playlistToPlaylistDtoMappingFactory = (mapper) =>
  createMap(
    mapper,
    Playlist,
    PlaylistDto,
    forMember(
      (dest: PlaylistDto) => dest._id,
      convertUsing(
        objectIdToStringConverter as never,
        (source: Playlist) => source._id
      )
    )
    // forMember((dest: PlaylistDto) => dest.createdBy, convertUsing(objectIdToStringConverter as never, (source: Playlist) => source.createdBy)),
  );

export const createPlaylistDtoToPlaylistMappingFactory = (mapper) =>
  createMap(
    mapper,
    CreatePlaylistDto,
    Playlist,
    forMember((dest: Playlist) => dest._id, ignore())
  );

export const updatePlaylistDtoToPlaylistMappingFactory = (mapper) =>
  createMap(
    mapper,
    UpdatePlaylistDto,
    Playlist,
    forMember(
      (dest: Playlist) => dest._id,
      convertUsing(
        stringToObjectIdConverter as never,
        (source: UpdatePlaylistDto) => source._id
      )
    )
  );

@Injectable()
export class PlaylistMapping extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      playlistToPlaylistDtoMappingFactory(mapper);
      createPlaylistDtoToPlaylistMappingFactory(mapper);
      updatePlaylistDtoToPlaylistMappingFactory(mapper);
    };
  }
}
