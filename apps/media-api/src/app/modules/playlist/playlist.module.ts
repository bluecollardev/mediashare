import { Module } from '@nestjs/common';
import { PlaylistDataService } from './providers/playlist-data.service';

@Module({
  providers: [
    { provide: 'PLAYLIST_COLLECTION', useValue: 'playlists' },
    PlaylistDataService,
  ],
})
export class PlaylistModule {}
