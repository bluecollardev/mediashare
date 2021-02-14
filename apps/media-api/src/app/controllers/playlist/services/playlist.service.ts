import { DataService } from '@api';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { MongoRepository } from 'typeorm';
import { Playlist } from '../entities/playlist.entity';

@Injectable()
export class PlaylistService extends DataService<
  Playlist,
  MongoRepository<Playlist>
> {
  constructor(
    @InjectRepository(Playlist)
    userRepository: MongoRepository<Playlist>,
    logger: PinoLogger
  ) {
    super(userRepository, new Playlist(), logger);
  }
}
