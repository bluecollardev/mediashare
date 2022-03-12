import { ObjectId } from 'mongodb';
import { BcBaseInterface } from './bc-base.interface';
import { BcRolesType } from './roles.enum';

export interface UserInterface extends BcBaseInterface {
  username?: string;
  firstName?: string;
  lastName?: string;
  sharedPlaylists?: string[] | ObjectId[];
  sharedMediaItems?: string[] | ObjectId[];
  roles?: BcRolesType[];
  /* TODO: add roles */
}
