// import { UserConnectionDto } from '../user-connection/tags/user-connection.tags';
import { AutoMap } from '@automapper/classes';
import { ApiBaseDto } from '@mediashare/core/dtos/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class MediaFlaggedItemDto extends ApiBaseDto {
  @IsOptional()
  @IsString()
  @AutoMap()
  @ApiProperty({ type: 'string' })
  mediaId?: string;

  @IsOptional()
  @IsString()
  @AutoMap()
  @ApiProperty({ type: 'string' })
  playlistId?: string;
}

export class PlaylistFlaggedItemDto extends ApiBaseDto {
  @IsOptional()
  @IsString()
  @AutoMap()
  @ApiProperty({ type: 'string' })
  mediaId?: string;

  @IsOptional()
  @IsString()
  @AutoMap()
  @ApiProperty({ type: 'string' })
  playlistId?: string;
}

export class FlaggedItemsDto {
  @ApiProperty({ name: 'mediaItems', type: () => MediaFlaggedItemDto })
  mediaItems: MediaFlaggedItemDto[];

  @ApiProperty({ name: 'playlists', type: () => PlaylistFlaggedItemDto })
  playlists: PlaylistFlaggedItemDto[];
}

export class FlaggedItemsIdsDto {
  @ApiProperty({ name: 'flaggedItemIds', type: () => String, isArray: true })
  flaggedItemIds: string[];
}

// TODO: Fix this type!
export class FlaggedItemsByUserIdDto {
  @ApiProperty({
    name: 'flaggedItemByUserIds',
    type: () => String,
    isArray: true,
  })
  flaggedItemByUserIds: any[];
  // flaggedItemByUserIds: UserConnectionDto[];
}
