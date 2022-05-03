import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistItem } from './entities/playlist-item.entity';
import { PlaylistItemService } from './playlist-item.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlaylistItem])],
  providers: [PlaylistItemService],
  exports: [PlaylistItemService],
})
export class PlaylistItemModule {}
