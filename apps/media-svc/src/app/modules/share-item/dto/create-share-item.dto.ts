import { AutoMap } from '@automapper/classes';
import { ApiString } from '@mediashare/shared';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateMediaShareItemDto {
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
  @ApiProperty({ required: false })
  playlistId?: string;

  @IsOptional()
  @IsString()
  @AutoMap()
  @ApiProperty({ required: true })
  createdBy?: string;
}

export class CreatePlaylistShareItemDto {
  @IsString()
  @AutoMap()
  @ApiString({ required: true })
  userSub: string;

  @IsOptional()
  @IsString()
  @AutoMap()
  @ApiString({ required: true })
  mediaId?: string;

  @IsOptional()
  @IsString()
  @AutoMap()
  @ApiString({ required: true })
  playlistId?: string;

  @IsOptional()
  @IsString()
  @AutoMap()
  @ApiString({ required: true })
  createdBy?: string;
}
