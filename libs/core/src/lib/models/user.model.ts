import { ObjectId } from 'mongodb';

export interface User {
  _id?: string | ObjectId;
  username?: string;
  firstName?: string;
  lastName?: string;
  sharedPlaylists?: string[] | ObjectId[];
  sharedMediaItems?: string[] | ObjectId[];
  /* TODO: add roles */
}
