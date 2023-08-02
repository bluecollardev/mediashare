import { ApiProperty } from '@nestjs/swagger';
import { ApiBaseDto } from '@mediashare/core/dtos/base.dto';

export class UpdateMediaShareItemDto extends ApiBaseDto {
  @ApiProperty({ required: true })
  read: boolean;
}

export class UpdatePlaylistShareItemDto extends ApiBaseDto {
  @ApiProperty({ required: true })
  read: boolean;
}
