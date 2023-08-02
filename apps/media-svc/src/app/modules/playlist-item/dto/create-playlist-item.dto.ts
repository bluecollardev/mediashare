import { ApiProperty } from '@nestjs/swagger';
import { ApiObjectId } from '@mediashare/shared';

export class CreatePlaylistItemDto {
  // TODO: Ask Sean what this transform is for, or investigate
  @ApiObjectId({ required: true })
  // @Transform((string) => new ObjectIdPipe())
  playlistId: string;

  @ApiObjectId({ required: true })
  // @Transform((string) => new ObjectIdPipe())
  mediaId: string;

  @ApiProperty()
  sortIndex: number;
}
