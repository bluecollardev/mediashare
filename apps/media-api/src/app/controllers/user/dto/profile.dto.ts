import { ApiString } from '@mediashare/shared';
import { ApiProperty } from '@nestjs/swagger';

class ProfileShareItem {
  authorId: string;
  @ApiString()
  imageSrc: string;
  @ApiString()
  @ApiString()
  author: string;
  @ApiString()
  playlistId;
  @ApiString()
  shareItemId: string;

  @ApiProperty({ type: 'boolean' })
  read: boolean;
  @ApiString()
  createdAt: string;
  @ApiString()
  title: string;
  @ApiString()
  authorImage;
  @ApiString()
  authorName;
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
  @ApiString()
  role: string;
  @ApiString()
  phoneNumber: string;
  @ApiString()
  username: string;

  @ApiProperty({ type: () => ProfileShareItem, isArray: true })
  sharedItems: ProfileShareItem;
}
