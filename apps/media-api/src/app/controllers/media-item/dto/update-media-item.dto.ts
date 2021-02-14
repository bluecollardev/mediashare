import { PartialType } from '@nestjs/mapped-types';
import { CreateMediaItemDto } from './create-media-item.dto';

export class UpdateMediaItemDto extends PartialType(CreateMediaItemDto) {}
