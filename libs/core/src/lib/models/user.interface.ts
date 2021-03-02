import { ObjectId } from 'mongodb';
import { BcRolesType } from './roles.enum';

export interface UserInterface {
  _id?: string | ObjectId;
  username?: string;
  firstName?: string;
  lastName?: string;
  sharedPlaylists?: string[] | ObjectId[];
  sharedMediaItems?: string[] | ObjectId[];
  roles?: BcRolesType[];
  /* TODO: add roles */
}
