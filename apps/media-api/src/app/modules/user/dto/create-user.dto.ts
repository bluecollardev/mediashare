import { ApiProperty } from '@nestjs/swagger';
import { ApiDecoratorOptions, ApiEmail, ApiName, ApiObjectId, ApiPastDate, ApiString } from '@mediashare/shared';
import { ObjectId } from 'mongodb';
import { MediaItemResponseDto } from '@api-modules/media-item/dto/media-item-response.dto';
import { PlaylistResponseDto } from '@api-modules/playlist/dto/playlist-response.dto';
import { User } from '../entities/user.entity';
import { BC_ROLES } from '@core-lib';
import { BcRolesType } from '@api-core/types/roles.type';

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

  @ApiProperty({ type: () => MediaItemResponseDto, isArray: true })
  mediaItems?: MediaItemResponseDto[];

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
