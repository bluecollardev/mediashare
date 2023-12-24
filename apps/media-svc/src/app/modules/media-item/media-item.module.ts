import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaItemMapping } from './mappers/automapper.profile';
import { MediaItemDataService, MediaItemService } from './media-item.service';
import { MediaItemController } from './media-item.controller';
import { MediaItem } from './entities/media-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MediaItem])],
  controllers: [MediaItemController],
  providers: [MediaItemService, MediaItemDataService, MediaItemMapping],
  exports: [MediaItemService],
})
export class MediaItemModule {}
