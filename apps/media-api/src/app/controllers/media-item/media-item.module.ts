import { Module } from '@nestjs/common';
import { MediaItemService } from './media-item.service';
import { MediaItemController } from './media-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaItem } from './entities/media-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MediaItem])],
  controllers: [MediaItemController],
  providers: [MediaItemService],
})
export class MediaItemModule {}
