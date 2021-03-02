import { IdType } from '../types/id.type';
import { Media } from './abstract/media.model';
import { Orderable } from './abstract/orderable.model';

export type PlaylistItem = {
  mediaId: IdType;
  userId: IdType;
  playlistId: IdType;
  /* TODO: category route */
};
