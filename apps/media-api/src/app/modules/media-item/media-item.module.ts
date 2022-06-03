import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from '@api-modules/app-config/app-config.module';
import { AuthModule } from '@api-modules/auth/auth.module';
import { ShareItemModule } from '@api-modules/share-item/share-item.module';
import { MediaItemService } from './media-item.service';
import { MediaItemController } from './media-item.controller';
import { MediaItem } from './entities/media-item.entity';

@Module({
  imports: [AppConfigModule, TypeOrmModule.forFeature([MediaItem]), ShareItemModule, AuthModule],
  controllers: [MediaItemController],
  providers: [MediaItemService],
})
export class MediaItemModule {}
