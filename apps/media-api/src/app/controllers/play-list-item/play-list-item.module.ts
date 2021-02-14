import { Module } from '@nestjs/common';
import { PlayListItemService } from './play-list-item.service';
import { PlayListItemController } from './play-list-item.controller';

@Module({
  controllers: [PlayListItemController],
  providers: [PlayListItemService]
})
export class PlayListItemModule {}
