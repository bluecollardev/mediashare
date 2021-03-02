import { ObjectId } from 'mongodb';
import { Tag } from '../entities/tag.entity';
import { CreateDtoType } from '../types/create-dto.type';

export class CreateTagDto implements CreateDtoType<Tag> {
  key: string;
  value: string;
  mediaId: ObjectId;
  userId: ObjectId;
}
