import { UserController } from './user.controller';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PlaylistService } from '../playlist/services/playlist.service';
import { Playlist } from '../playlist/entities/playlist.entity';
import { PlaylistItemService } from '../../modules/playlist-item/services/playlist-item.service';
import { PlaylistItem } from '../../modules/playlist-item/entities/playlist-item.entity';
import { MediaItemService } from '../media-item/media-item.service';
import { MediaItem } from '../media-item/entities/media-item.entity';
import { ShareItemModule } from '../../modules/share-item/share-item.module';
import { JwtDecodeMiddleware } from '../../core/middleware/jwt-decode.middleware';
import { AuthModule } from '../../modules/auth/auth.module';
import { AppConfigModule } from '../../modules/app-config.module.ts/app-config.module';
import { AppConfigService } from '../../modules/app-config.module.ts/app-config.provider';

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
