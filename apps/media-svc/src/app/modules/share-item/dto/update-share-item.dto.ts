import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { ApiBaseDto } from '@mediashare/core/dtos/base.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateMediaShareItemDto extends ApiBaseDto {
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

export class UpdatePlaylistShareItemDto extends ApiBaseDto {
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
