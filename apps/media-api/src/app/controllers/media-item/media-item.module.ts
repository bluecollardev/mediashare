import { Module } from '@nestjs/common';
import { MediaItemService } from './media-item.service';
import { MediaItemController } from './media-item.controller';

@Module({
  controllers: [MediaItemController],
  providers: [MediaItemService]
})
export class MediaItemModule {}
