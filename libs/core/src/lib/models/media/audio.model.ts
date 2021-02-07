import { Media } from '../abstract/media.model';
import { Model } from '../abstract/model';

export interface Audio extends Media {
  lengthMs?: number;
}

export class AudioModel extends Model<Audio> {}
