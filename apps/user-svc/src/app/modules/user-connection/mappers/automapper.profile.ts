/* istanbul ignore file */
import { convertUsing, createMap, forMember, ignore, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { objectIdToStringConverter, stringToObjectIdConverter } from '@mediashare/core/mappings/converters';
import { Injectable } from '@nestjs/common';
import { UserConnection } from '../entities/user-connection.entity';
import { CreateUserConnectionDto } from '../dto/create-user-connection.dto';
import { UpdateUserConnectionDto } from '../dto/update-user-connection.dto';
import { UserConnectionDto } from '../dto/user-connection.dto';

export const connectionToConnectionDtoMappingFactory = (mapper) => createMap(
  mapper,
  UserConnection,
  UserConnectionDto,
  forMember((dest: UserConnectionDto) => dest._id, convertUsing(objectIdToStringConverter as never, (source: UserConnection) => source._id)),
  forMember((dest: UserConnectionDto) => dest.userId, convertUsing(objectIdToStringConverter as never, (source: UserConnection) => source.userId)),
  forMember((dest: UserConnectionDto) => dest.connectionId, convertUsing(objectIdToStringConverter as never, (source: UserConnection) => source.connectionId)),
);

export const createConnectionDtoToConnectionMappingFactory = (mapper) => createMap(
  mapper,
  CreateUserConnectionDto,
  UserConnection,
  forMember((dest: UserConnection) => dest._id, ignore()),
  forMember((dest: UserConnection) => dest.userId, convertUsing(stringToObjectIdConverter as never, (source: UserConnectionDto) => source.userId)),
  forMember((dest: UserConnection) => dest.connectionId, convertUsing(stringToObjectIdConverter as never, (source: UserConnectionDto) => source.connectionId)),
);

export const updateConnectionDtoToConnectionMappingFactory = (mapper) => createMap(
  mapper,
  UpdateUserConnectionDto,
  UserConnection,
  forMember((dest: UserConnection) => dest._id, convertUsing(stringToObjectIdConverter as never, (source: UserConnectionDto) => source._id)),
  forMember((dest: UserConnection) => dest.userId, convertUsing(stringToObjectIdConverter as never, (source: UserConnectionDto) => source.userId)),
  forMember((dest: UserConnection) => dest.connectionId, convertUsing(stringToObjectIdConverter as never, (source: UserConnectionDto) => source.connectionId)),
);

@Injectable()
export class UserConnectionMapping extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      connectionToConnectionDtoMappingFactory(mapper);
      createConnectionDtoToConnectionMappingFactory(mapper);
      updateConnectionDtoToConnectionMappingFactory(mapper);
    };
  }
}
