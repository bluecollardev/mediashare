import { Module } from '@nestjs/common';
import { PlaylistController } from './playlist.controller';
import { Playlist } from './entities/playlist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistService } from './services/playlist.service';
import { PlaylistItem } from './entities/playlist-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist, PlaylistItem])],
  controllers: [PlaylistController],
  providers: [PlaylistService],
})
export class PlaylistModule {}
