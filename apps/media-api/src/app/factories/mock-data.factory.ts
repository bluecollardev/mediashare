import * as Faker from 'faker';
import { ObjectId } from 'mongodb';
import { CreateMediaItemDto } from '../controllers/media-item/dto/create-media-item.dto';
import { MediaItem } from '../controllers/media-item/entities/media-item.entity';
import { CreateUserDto } from '../controllers/user/dto/create-user.dto';
import { User } from '../controllers/user/entities/user.entity';
import { CreatePlaylistItemDto } from '../modules/playlist-item/dto/create-playlist-item.dto';

import * as R from 'remeda';
import { Playlist } from '../controllers/playlist/entities/playlist.entity';
import { SessionUserInterface } from '../core/models/auth-user.model';

import { ObjectIdGuard } from '@util-lib';

class DataFn {
  static id = () => new ObjectId();
  static shortString = Faker.lorem.sentence;
  static longString = Faker.lorem.lines;
  static key = Faker.random.word;
  static value = Faker.random.word;
  static bool = Faker.random.boolean;
  static title = Faker.random.word;
  static number = (num: number) => Faker.random.number(num);
}
type Gconstructor<T = {}> = new (...args: any[]) => T;

type BaseConstructor = Gconstructor;

function baseEntityMixin<TBase extends BaseConstructor>(Base: TBase) {
  class WithObjectId extends Base {
    _id: ObjectId = new ObjectId();
  }
  return WithObjectId;
}

interface ConcretePlaylistFactory {
  createUserDto(): CreateUserDto;
}

export class UserFactory extends DataFn implements ConcretePlaylistFactory {
  user: User;
  get userId() {
    return this.user._id.toHexString();
  }

  createUserDto() {
    return {
      username: Faker.internet.email(),
      firstName: Faker.name.firstName(),
      lastName: Faker.name.lastName(),
      authId: Faker.random.uuid(),
      password: 'welcome1',
    };
  }

  createSessionUser(): SessionUserInterface {
    const { username, _id: idObject } = this.user;

    const _id = idObject.toHexString();
    const email = username;
    return {
      username,
      _id: ObjectIdGuard(_id),
      createdAt: new Date(),
      email,
      roles: ['user'],
    };
  }

  constructor(id?: string) {
    super();
    const userMixin = baseEntityMixin(User);
    this.user = new userMixin(this.createUserDto());
    if (id) {
      const _id = new ObjectId(id);
      this.user._id = _id;
    }
  }

  createPlaylistDto(items = []) {
    return {
      userId: this.user._id,
      title: DataFn.title(),
    };
  }

  createPlaylist() {
    const playlistMixin = baseEntityMixin(Playlist);
    return new playlistMixin();
  }

  createPlaylistItemDto() {
    return {};
  }

  createSharedItem() {
    return {};
  }

  createMediaDto(): CreateMediaItemDto {
    return {
      summary: Faker.lorem.lines(),
      title: Faker.lorem.sentence(),
      isPlayable: Faker.random.boolean(),
      description: Faker.lorem.lines(),
      category: 'flexibility',
      userId: this.user._id,
      createdAt: new Date(),
    };
  }

  createMediaItem() {
    const mediaItemMixin = baseEntityMixin(MediaItem);

    return new mediaItemMixin(this.createMediaDto());
  }
}

export function userDataFactory(userFactory: UserFactory) {
  const user = userFactory.user;

  const media = R.range(1, DataFn.number(10)).map(() => userFactory.createMediaDto());
  const playlistDto = R.range(1, DataFn.number(4)).map(() => userFactory.createPlaylistDto(media));

  return { playlistDto, user, media };
}
``;
