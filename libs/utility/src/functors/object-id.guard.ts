import { ObjectID, ObjectId } from 'mongodb';
import { IdType } from '../types';
const ObjectIdGuard = function (value: IdType): ObjectID {
  return typeof value === 'string' ? new ObjectID(value) : value;
};

const StringIdGuard = function (value: IdType): string {
  return typeof value === 'string' ? value : value.toHexString();
};

export { ObjectIdGuard, StringIdGuard };
