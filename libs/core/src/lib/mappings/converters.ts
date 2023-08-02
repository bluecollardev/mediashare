import { Converter } from '@automapper/types';
import { ObjectId } from 'mongodb';

export const objectIdToStringConverter: Converter<ObjectId, string> = {
  convert(source) {
    return source.toHexString();
  }
};
export const stringToObjectIdConverter: Converter<string, ObjectId> = {
  convert(source) {
    return new ObjectId(source);
  }
};
