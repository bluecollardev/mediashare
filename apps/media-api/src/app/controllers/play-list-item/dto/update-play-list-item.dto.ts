import { PartialType } from '@nestjs/mapped-types';
import { CreatePlayListItemDto } from './create-play-list-item.dto';

export class UpdatePlayListItemDto extends PartialType(CreatePlayListItemDto) {}
