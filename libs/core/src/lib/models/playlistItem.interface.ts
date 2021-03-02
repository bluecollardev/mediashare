import { IdType } from '../types/id.type';
import { Orderable } from './abstract/orderable.model';

export interface PlaylistItemInterface {
  mediaId: IdType;
  userId: IdType;
  playlistId: IdType;
  /* TODO: category route */
}
