// import { UserConnectionDto } from '../user-connection/tags/user-connection.tags';
import { AutoMap } from '@automapper/classes';
import { ApiBaseDto } from '@mediashare/core/dtos/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class MediaShareItemDto extends ApiBaseDto {
  @IsOptional()
  @IsString()
  @AutoMap()
  @ApiProperty({ type: 'string' })
  shareId?: string;

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

export class PlaylistShareItemDto extends ApiBaseDto {
  @IsOptional()
  @IsString()
  @AutoMap()
  @ApiProperty({ type: 'string' })
  shareId?: string;

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

export class ShareItemsDto {
  @ApiProperty({ name: 'mediaItems', type: () => MediaShareItemDto })
  mediaItems: MediaShareItemDto[];

  @ApiProperty({ name: 'playlists', type: () => PlaylistShareItemDto })
  playlists: PlaylistShareItemDto[];
}

export class ShareItemsIdsDto {
  @ApiProperty({ name: 'shareItemIds', type: () => String, isArray: true })
  shareItemIds: string[];
}

// TODO: Fix this type!
export class ShareItemsByUserIdDto {
  @ApiProperty({
    name: 'shareItemByUserIds',
    type: () => String,
    isArray: true,
  })
  shareItemByUserIds: any[];
  // shareItemByUserIds: UserConnectionDto[];
}
