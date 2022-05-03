import { IdType } from '../types/id.type';

export interface TagInterface {
  // TODO: custom / private user tag
  key: string; // eg. some-tag
  value: string; // eg. 'Some Tag'
  _id?: IdType; // ObjectId
}
