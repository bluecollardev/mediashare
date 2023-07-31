import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShareItemModule } from '../share-item/share-item.module';
import { MediaItemService } from './media-item.service';
import { MediaItemController } from './media-item.controller';
import { MediaItem } from './entities/media-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MediaItem]), ShareItemModule],
  controllers: [MediaItemController],
  providers: [MediaItemService],
})
export class MediaItemModule {}
