import { Module } from '@nestjs/common';
import { MediaDataService } from './providers/media-data.service';

@Module({
  providers: [
    { provide: 'MEDIA_COLLECTION', useValue: 'media' },
    MediaDataService,
  ],
})
export class MediaModule {}
