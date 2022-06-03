import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@api-modules/auth/auth.module';
import { AppConfigModule } from '@api-modules/app-config/app-config.module';
import { ShareItemModule } from '@api-modules/share-item/share-item.module';
import { PlaylistItemService } from './playlist-item.service';
import { PlaylistItemController } from './playlist-item.controller';
import { PlaylistItem } from './entities/playlist-item.entity';
import { MediaItemModule } from '@api-modules/media-item/media-item.module';
import { MediaItemService } from '@api-modules/media-item/media-item.service';
import { MediaItem } from '@api-modules/media-item/entities/media-item.entity';

@Module({
  imports: [AppConfigModule, TypeOrmModule.forFeature([PlaylistItem, MediaItem]), ShareItemModule, MediaItemModule, AuthModule],
  controllers: [PlaylistItemController],
  providers: [PlaylistItemService, MediaItemService],
})
export class PlaylistItemModule {}
