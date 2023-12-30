import { AutoMap } from '@automapper/classes';
import { ApiString } from '@mediashare/shared';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateMediaFlaggedItemDto {
  @IsString()
  @AutoMap()
  @ApiProperty({ required: true })
  userSub: string;

  @IsOptional()
  @IsString()
  @AutoMap()
  @ApiProperty({ required: false })
  mediaId?: string;

  @IsOptional()
  @IsString()
  @AutoMap()
  @ApiProperty({ required: true })
  createdBy: string;
}

export class CreatePlaylistFlaggedItemDto {
  @IsString()
  @AutoMap()
  @ApiString({ required: true })
  userSub: string;

  @IsOptional()
  @IsString()
  @AutoMap()
  @ApiString({ required: false })
  playlistId?: string;

  @IsOptional()
  @IsString()
  @AutoMap()
  @ApiString({ required: true })
  createdBy: string;
}
