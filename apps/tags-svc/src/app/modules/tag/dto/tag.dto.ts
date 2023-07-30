import { ApiProperty } from '@nestjs/swagger';
import { Tag } from './entities/tag.entity';

class TagResponseDto {
  @ApiProperty({ name: 'tags', type: () => TagResponseDto, description: 'tags' })
  tags: Tag[];
}

export { TagResponseDto };
