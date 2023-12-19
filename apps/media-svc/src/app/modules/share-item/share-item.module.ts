import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { ShareItemController } from './share-item.controller';
import { ShareItemDataService, ShareItemService } from './share-item.service';
import { ShareItem } from './entities/share-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShareItem])],
  // controllers: [ShareItemController],
  providers: [ShareItemService, ShareItemDataService],
  exports: [ShareItemService],
})
export class ShareItemModule {}
