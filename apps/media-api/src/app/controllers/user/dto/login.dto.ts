import { ApiEmail, ApiName, ApiString } from '@mediashare/shared';
import { ApiHideProperty, ApiProperty, OmitType } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, IsJWT } from 'class-validator';
import { ObjectId } from 'mongodb';
import { MediaItem } from '../../media-item/entities/media-item.entity';
import { Playlist } from '../../playlist/entities/playlist.entity';
import { User } from '../entities/user.entity';
import { ApiPastDate } from '../../../../../../../libs/shared/src/lib/decorators/api-date.decorator';
const exampleToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.yJ1c2VyIjp7ImF1dGhJZCI6ImEwMWM4ZDhjLWExYTMtNDdjMS05MGVjLTY0ZmRkOTFiYjYxMSIsInVzZXJuYW1lIjoiTmFkaWExMkBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRRQy9KYXlWeDhYOHZYVUhjUmpSSWZPLmdXaGQ1U0FEYmFNbC9CeXgvUjdvVGJYSzRnQ1IyLiIsImVtYWlsIjoiTmFkaWExMkBnbWFpbC5jb20iLCJjcmVhdGVkQXQiOiIyMDIxLTAzLTA1VDEyOjA2OjMzLjgzMVoiLCJfaWQiOiI2MDQyMWVjOTdiYmVlYTA2ZGZiZjI2ZGEiLCJyb2xlcyI6WyJndWVzdCJdfSwic3ViIjoiYTAxYzhkOGMtYTFhMy00N2MxLTkwZWMtNjRmZGQ5MWJiNjExIiwiaWF0IjoxNjE0OTQ2MDI4LCJleHAiOjE2MTQ5ODIwMjh9.ZK5s6OFB8zQ0yL3SgzYZXpjTMJyptXv5FouDyqQVlg';

export class LoginDto {
  @ApiEmail({ required: true })
  username: string;

  @ApiProperty({ required: true })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @ApiHideProperty()
  password: string;
}

export class LoginResponseDto implements Omit<User, '_id' | 'sharedMediaItems' | 'sharedPlaylists' | 'userId'> {
  @ApiString()
  username: string;
  @ApiName()
  firstName: string;
  @ApiName()
  lastName: string;

  @ApiPastDate()
  createdAt?: Date;
  @ApiPastDate()
  updatedDate?: Date;
  createdBy?: Readonly<ObjectId>;

  @ApiProperty({
    type: String,
    pattern: '^[A-Za-z0-9-_=]+\\.[A-Za-z0-9-_=]+\\.?[A-Za-z0-9-_.+/=]*$',
    example: exampleToken,
  })
  accessToken;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: String })
  _id: string;

  @ApiProperty({ type: MediaItem, isArray: true })
  sharedMediaItems: MediaItem[];

  @ApiProperty({ type: Playlist, isArray: true })
  sharedPlaylists: Playlist[];

  @ApiProperty({ type: MediaItem, isArray: true })
  mediaItems: MediaItem[];

  @ApiProperty({ type: Playlist, isArray: true })
  playlists: Playlist[];
}

export class TokenDto {
  @ApiProperty({
    type: String,
    example: exampleToken,
    pattern: '^[A-Za-z0-9-_=]+\\.[A-Za-z0-9-_=]+\\.?[A-Za-z0-9-_.+/=]*$',
  })
  @IsJWT()
  token: string;
}
