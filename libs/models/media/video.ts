import { Media } from '../abstract/media';

export interface Video extends Media {
  lengthMs?: number;
}
