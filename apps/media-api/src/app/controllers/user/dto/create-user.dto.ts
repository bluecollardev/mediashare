import { ApiProperty } from '@nestjs/swagger';

import { ApiDecoratorOptions, ApiEmail, ApiName, ApiObjectId, ApiPastDate, ApiString } from '@mediashare/shared';
import { ObjectId } from 'mongodb';
import { MediaItemDto } from '../../media-item/dto/media-item.dto';
import { PlaylistResponseDto } from '../../playlist/dto/playlist-response.dto';
import { User } from '../entities/user.entity';
import { BC_ROLES } from '@core-lib';
import { BcRolesType } from '@api-core/types/roles.type';

const uuidExample = '1731ee8a-8f27-53af-805d-2ee2e705f0e2';
export class CreateUserDto {
  @ApiName(<ApiDecoratorOptions>{ required: true })
  firstName: string;

  @ApiName(<ApiDecoratorOptions>{ required: true })
  lastName: string;

  @ApiEmail(<ApiDecoratorOptions>{ required: true })
  email: string;

  @ApiName(<ApiDecoratorOptions>{ required: true })
  username: string;
}

export class UserDto implements User {
  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
  @ApiString()
  imageSrc: string;

  @ApiObjectId()
  _id: ObjectId;

  @ApiString()
  username: string;
  @ApiString()
  firstName: string;
  @ApiString()
  lastName: string;
  @ApiProperty({ enum: BC_ROLES, name: 'role', enumName: 'BcRolesType' }) role: BcRolesType;

  @ApiString()
  email: string;

  @ApiString()
  sub: string;

  @ApiString()
  createdBy?: Readonly<ObjectId>;

  @ApiString()
  userId?: ObjectId;

  @ApiString()
  phoneNumber: string;

  @ApiProperty({ type: () => MediaItemDto, isArray: true })
  mediaItems?: MediaItemDto[];

  @ApiProperty({ type: () => PlaylistResponseDto, isArray: true })
  playlists?: PlaylistResponseDto[];

  @ApiProperty()
  sharedPlaylists?: ObjectId[];
  @ApiProperty()
  sharedMediaItems?: ObjectId[];

  @ApiPastDate()
  createdAt?: Date;

  @ApiPastDate()
  updatedDate?: Date;
}
