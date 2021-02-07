import { Media } from '../abstract/media.model';

export interface Audio extends Media {
  lengthMs?: number;
}
