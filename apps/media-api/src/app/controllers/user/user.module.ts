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
import { ShareItemModule } from '../../modules/share-item/share-item.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Playlist, PlaylistItem, MediaItem]),
    ShareItemModule,
    ClientsModule.register([
      {
        name: 'AUTH_CLIENT',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 4000,
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, PlaylistService, PlaylistItemService, MediaItemService],
  exports: [],
})
export class UserModule {}
