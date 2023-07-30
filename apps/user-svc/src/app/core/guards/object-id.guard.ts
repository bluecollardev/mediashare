import { ObjectId } from 'mongodb';
import { IdType } from '@mediashare/shared';

export const ObjectIdGuard = function (value: IdType): ObjectId {
  return typeof value === 'string' ? new ObjectId(value) : value;
};

export const StringIdGuard = function (value: IdType): string {
  return typeof value === 'string' ? value : value.toHexString();
};
