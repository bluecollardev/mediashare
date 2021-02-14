import { DataService } from '@api';
import { Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreatePlayListItemDto } from './dto/create-play-list-item.dto';
import { UpdatePlayListItemDto } from './dto/update-play-list-item.dto';
import { PlayListItem } from './entities/play-list-item.entity';

@Injectable()
export class PlayListItemService extends DataService<
  PlayListItem,
  MongoRepository<User>
> {
  constructor(
    @InjectRepository(User)
    userRepository: MongoRepository<User>,
    @InjectPinoLogger(UserService.name)
    private readonly injectedLogger: PinoLogger
  ) {
    super(userRepository, new User(), injectedLogger);
  }
}
