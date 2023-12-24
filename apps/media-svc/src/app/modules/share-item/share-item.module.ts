import { ShareItemMapping } from '@mediashare/media-svc/src/app/modules/share-item/mappers/automapper.profile';
import { MediaItemModule } from '../media-item/media-item.module';
import { MediaItemService } from '../media-item/media-item.service';
import { PlaylistModule } from '../playlist/playlist.module';
import { PlaylistService } from '../playlist/playlist.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShareItemController } from './share-item.controller';
import { ShareItemDataService, ShareItemService } from './share-item.service';
import { ShareItem } from './entities/share-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShareItem, MediaItemModule, PlaylistModule]),
  ],
  controllers: [ShareItemController],
  providers: [
    ShareItemService,
    ShareItemDataService,
    ShareItemMapping,
    MediaItemService,
    PlaylistService,
  ],
  exports: [ShareItemService],
})
export class ShareItemModule {}
