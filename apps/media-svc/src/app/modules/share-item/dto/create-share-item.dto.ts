import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateMediaShareItemDto {
  @IsString()
  @AutoMap()
  @ApiProperty({ required: true })
  sub: string;

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
  @ApiProperty({ required: true })
  sub: string;

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
