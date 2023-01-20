import { IdType } from '../types/id.type';
import { BcBaseInterface } from './bc-base.interface';
import { PlaylistVisibilityType } from '../../';

export interface PlaylistInterface extends BcBaseInterface {
  title: string;
  visibility: PlaylistVisibilityType;
  cloneOf?: IdType;
}
