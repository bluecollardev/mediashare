import { ObjectId } from 'mongodb';

export class CreateTagDto {
  key: string;
  value: string;
  mediaId: ObjectId;
  userId: ObjectId;
}
