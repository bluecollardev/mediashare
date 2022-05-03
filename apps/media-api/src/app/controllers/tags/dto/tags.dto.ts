import { ApiProperty } from '@nestjs/swagger';
import { Tag } from '@api-core/entities/tag.entity';

class TagResponseDto {
  @ApiProperty({ name: 'Tags', type: () => TagResponseDto, description: 'tags' })
  tags: Tag[];
}

export { TagResponseDto };
