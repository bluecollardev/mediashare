import { IntersectionType } from '@nestjs/swagger';
import { AdditionalMediaItemDto, CreateMediaItemDto } from './create-media-item.dto';

export class MediaItemDto extends IntersectionType(CreateMediaItemDto, AdditionalMediaItemDto) {}
