import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShareItem } from './entities/share-item.entity';
import { ShareItemService } from './services/share-item.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShareItem])],
  providers: [ShareItemService],
  exports: [ShareItemService],
})
export class ShareItemModule {}
