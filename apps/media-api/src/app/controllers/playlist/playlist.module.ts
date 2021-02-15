import { Module } from '@nestjs/common';
import { PlaylistController } from './playlist.controller';
import { Playlist } from './entities/playlist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistService } from './services/playlist.service';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist]), PlaylistModule],
  controllers: [PlaylistController],
  providers: [PlaylistService],
})
export class PlaylistModule {}
