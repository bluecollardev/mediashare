import { ApiObjectId, ApiString } from '@mediashare/shared';
import { ApiProperty } from '@nestjs/swagger';
import { BC_ROLES } from '@core-lib';
import { BcRolesType } from '@api-core/types/roles.type';

class ProfileShareItem {
  @ApiString()
  createdAt: string;

  @ApiString()
  authorImage;

  @ApiString()
  authorName;

  @ApiString()
  author: string;

  @ApiObjectId()
  authorId: string;

  @ApiString()
  imageSrc: string;

  @ApiObjectId()
  playlistId;

  @ApiObjectId()
  shareId: string;

  @ApiProperty({ type: 'boolean' })
  read: boolean;

  @ApiString()
  title: string;
}

export class AuthorProfileDto {
  @ApiObjectId()
  authorId: string;

  @ApiString()
  authorName;

  @ApiString()
  authorUsername: string;

  @ApiString()
  authorImage;
}

export class ProfileDto {
  @ApiString()
  _id: string;

  @ApiString()
  createdBy: string;

  @ApiString()
  imageSrc: string;

  @ApiString()
  firstName: string;

  @ApiString()
  lastName: string;

  @ApiString()
  email: string;

  @ApiProperty({ enum: BC_ROLES, name: 'role', enumName: 'BcRolesType' })
  role: BcRolesType;

  @ApiString()
  phoneNumber: string;

  @ApiString()
  username: string;

  @ApiProperty({ type: () => ProfileShareItem, isArray: true })
  sharedItems: ProfileShareItem;

  @ApiProperty({ type: Number })
  sharedCount: number;

  @ApiProperty({ type: Number })
  sharesCount: number;

  @ApiProperty({ type: Number })
  likesCount: number;
}
