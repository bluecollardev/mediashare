import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@api-modules/auth/auth.module';
import { AppConfigModule } from '@api-modules/app-config/app-config.module';
import { ShareItemModule } from '@api-modules/share-item/share-item.module';
import { PlaylistItemService } from './playlist-item.service';
import { PlaylistItemController } from './playlist-item.controller';
import { PlaylistItem } from './entities/playlist-item.entity';

@Module({
  imports: [AppConfigModule, TypeOrmModule.forFeature([PlaylistItem]), ShareItemModule, AuthModule],
  controllers: [PlaylistItemController],
  providers: [PlaylistItemService],
})
export class PlaylistItemModule {}
