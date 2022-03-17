import { IdType } from '../types/id.type';

export interface TagInterface {
  // If this is set, consider the tag a custom / private user tag
  key: string; // eg. some-tag
  value: string; // eg. 'Some Tag'
  userId?: IdType; // ObjectId
}
