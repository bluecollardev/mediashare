import { UserController } from './user.controller';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PlaylistService } from '../playlist/playlist.service';
import { Playlist } from '../playlist/entities/playlist.entity';
import { PlaylistItemService } from '@api-modules/playlist-item/playlist-item.service';
import { PlaylistItem } from '@api-modules/playlist-item/entities/playlist-item.entity';
import { MediaItemService } from '../media-item/media-item.service';
import { MediaItem } from '../media-item/entities/media-item.entity';
import { ShareItemModule } from '@api-modules/share-item/share-item.module';
import { JwtDecodeMiddleware } from '@api-core/middleware/jwt-decode.middleware';
import { AuthModule } from '@api-modules/auth/auth.module';
import { AppConfigModule } from '@api-modules/app-config/app-config.module';
import { AppConfigService } from '@api-modules/app-config/app-config.provider';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([User, Playlist, PlaylistItem, MediaItem]), ShareItemModule, AppConfigModule],
  controllers: [UserController, UsersController],
  providers: [PlaylistService, PlaylistItemService, MediaItemService, AppConfigService],
  exports: []
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtDecodeMiddleware).forRoutes(UsersController);
  }
}
