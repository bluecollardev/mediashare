import { ApiProperty } from '@nestjs/swagger';
import { ApiObjectId } from '@mediashare/shared';
import { Column, Index } from 'typeorm';

export class CreatePlaylistItemDto {
  // TODO: Ask Sean what this transform is for, or investigate
  @ApiObjectId({ required: true })
  // @Transform((string) => new ObjectIdPipe())
  @Index('playlistId', { unique: false })
  playlistId: string;

  @ApiObjectId({ required: true })
  // @Transform((string) => new ObjectIdPipe())
  @Index('mediaId')
  mediaId: string;

  @ApiProperty()
  sortIndex: number;
}
