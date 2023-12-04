import { IdType } from '@mediashare/shared';

export interface TagInterface {
  key: string; // eg. some-tag
  value: string; // eg. 'Some Tag'
  _id?: IdType; // ObjectId
}
