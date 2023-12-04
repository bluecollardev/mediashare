import { ApiBaseDto } from '../../../dtos/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Tag } from '../tag.entity';

export class TagDto extends ApiBaseDto {
  @ApiProperty({ name: 'tags', type: () => TagDto, description: 'tags' })
  tags: Tag[];
}
