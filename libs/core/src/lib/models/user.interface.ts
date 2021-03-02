import { ObjectId } from 'mongodb';

export interface UserInterface {
  _id?: string | ObjectId;
  username?: string;
  firstName?: string;
  lastName?: string;
  sharedPlaylists?: string[] | ObjectId[];
  sharedMediaItems?: string[] | ObjectId[];
  /* TODO: add roles */
}
