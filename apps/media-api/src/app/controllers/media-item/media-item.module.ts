import { Module } from '@nestjs/common';
import { MediaItemService } from './media-item.service';
import { MediaItemController } from './media-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaItem } from './entities/media-item.entity';
import { ShareItemModule } from '../../modules/share-item/share-item.module';
import { AuthModule } from '../../modules/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([MediaItem]), ShareItemModule, AuthModule],
  controllers: [MediaItemController],
  providers: [MediaItemService],
})
export class MediaItemModule {}
