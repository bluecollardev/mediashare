import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ObjectId } from 'mongodb';

export class CreateTagDto {
  @ApiProperty({ required: true })
  @IsString()
  key: string;

  @ApiProperty({ required: true })
  @IsString()
  value: string;

  @ApiProperty({ type: Boolean, required: true })
  isMediaTag: boolean;

  @ApiProperty({ type: Boolean, required: true })
  isPlaylistTag: boolean;

  @ApiProperty({ type: [], required: true, isArray: true, nullable: true })
  parentIds: ObjectId[];
}

export class CreateTagInput {
  key: string;
  value?: string;
  isMediaTag?: boolean;
  isPlaylistTag?: boolean;
  parentIds?: ObjectId[];
}
