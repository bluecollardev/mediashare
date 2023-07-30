import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from '../app-config/app-config.module';
import { AppConfigService } from '../app-config/app-config.provider';
import { ShareItemModule } from '../share-item/share-item.module';
import { MediaItemService } from './media-item.service';
import { MediaItemController } from './media-item.controller';
import { MediaItem } from './entities/media-item.entity';

@Module({
  imports: [AppConfigModule, TypeOrmModule.forFeature([MediaItem]), ShareItemModule],
  controllers: [MediaItemController],
  providers: [MediaItemService, AppConfigService],
})
export class MediaItemModule {}
