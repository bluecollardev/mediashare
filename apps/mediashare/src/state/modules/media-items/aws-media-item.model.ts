export interface AwsMediaItem {
  key: string;
  size: number;
  lastModified: string;
  etag: string;
}

export class AwsMediaItem {
  constructor(item) {
    Object.assign(this, item);
  }
}
