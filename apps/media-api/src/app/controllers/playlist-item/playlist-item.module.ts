import { Module } from '@nestjs/common';
import { PlaylistItemService } from './playlist-item.service';
import { PlaylistItemController } from './playlist-item.controller';
import { PlaylistItem } from './entities/playlist-item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PlaylistItem])],
  controllers: [PlaylistItemController],
  providers: [PlaylistItemService],
})
export class PlaylistItemModule {}
