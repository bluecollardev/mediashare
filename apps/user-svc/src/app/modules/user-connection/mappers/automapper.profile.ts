/* istanbul ignore file */
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, ignore, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { UserConnection } from '../entities/user-connection.entity';
import { CreateUserConnectionDto } from '../dto/create-user-connection.dto';
import { UpdateUserConnectionDto } from '../dto/update-user-connection.dto';
import { UserConnectionDto } from '../dto/user-connection.dto';

@Injectable()
export class UserConnectionMapping extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, UserConnection, UserConnectionDto);
      createMap(mapper, CreateUserConnectionDto, UserConnection, forMember((dest) => dest['_id'], ignore()));
      createMap(mapper, UpdateUserConnectionDto, UserConnection);
    };
  }
}
