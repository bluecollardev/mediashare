import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PlaylistService } from '../playlist/services/playlist.service';
import { Playlist } from '../playlist/entities/playlist.entity';
import { PlaylistItemService } from '../../modules/playlist-item/services/playlist-item.service';
import { PlaylistItem } from '../../modules/playlist-item/entities/playlist-item.entity';
import { MediaItemService } from '../media-item/media-item.service';
import { MediaItem } from '../media-item/entities/media-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Playlist, PlaylistItem, MediaItem])],
  controllers: [UserController],
  providers: [UserService, PlaylistService, PlaylistItemService, MediaItemService],
  exports: [],
})
export class UserModule {}
