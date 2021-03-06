import { ObjectID, ObjectId } from 'mongodb';
import { IdType } from '../types';
const ObjectIdGuard = function (value: IdType): ObjectID {
  return typeof value === 'string' ? new ObjectID(value) : value;
};

export { ObjectIdGuard };
