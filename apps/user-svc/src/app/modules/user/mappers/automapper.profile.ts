/* istanbul ignore file */
import { convertUsing, createMap, forMember, ignore, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { objectIdToStringConverter, stringToObjectIdConverter } from '@mediashare/core/mappings/converters';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserDto } from '../dto/user.dto';
import { User } from '../entities/user.entity';

export const userToUserDtoMappingFactory = (mapper) => createMap(
  mapper,
  User,
  UserDto,
  forMember((dest: UserDto) => dest._id, convertUsing(objectIdToStringConverter as never, (source: User) => source._id)),
  // forMember((dest: UserDto) => dest.createdBy, convertUsing(objectIdToStringConverter as never, (source: User) => source.createdBy)),
);

export const createUserDtoToUserMappingFactory = (mapper) => createMap(
  mapper,
  CreateUserDto,
  User,
  forMember((dest: User) => dest._id, ignore()),
);

export const updateUserDtoToUserMappingFactory = (mapper) => createMap(
  mapper,
  UpdateUserDto,
  User,
  forMember((dest: User) => dest._id, convertUsing(stringToObjectIdConverter as never, (source: UpdateUserDto) => source._id)),
  // forMember((dest: User) => dest.createdBy, convertUsing(stringToObjectIdConverter as never, (source: UserDto) => source.createdBy)),
);

@Injectable()
export class UserMapping extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      userToUserDtoMappingFactory(mapper);
      createUserDtoToUserMappingFactory(mapper);
      updateUserDtoToUserMappingFactory(mapper);
    };
  }
}
