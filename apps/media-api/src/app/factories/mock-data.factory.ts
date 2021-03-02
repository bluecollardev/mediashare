import * as Faker from 'faker';
import { ObjectId } from 'mongodb';
import { CreateMediaItemDto } from '../controllers/media-item/dto/create-media-item.dto';
import { MediaItem } from '../controllers/media-item/entities/media-item.entity';
import { CreateUserDto } from '../controllers/user/dto/create-user.dto';
import { User } from '../controllers/user/entities/user.entity';
import { CreatePlaylistItemDto } from '../modules/playlist-item/dto/create-playlist-item.dto';

import * as R from 'remeda';
import { Playlist } from '../controllers/playlist/entities/playlist.entity';

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

  constructor() {
    super();
    const userMixin = baseEntityMixin(User);
    this.user = new userMixin(this.createUserDto());
  }

  createPlaylistDto() {
    return {
      userId: this.userId,
      title: DataFn.title(),
    };
  }
  createPlaylist() {
    const playlistMixin = baseEntityMixin(Playlist);
    return new playlistMixin({ userId: this.user._id, title: DataFn.title(), items: [] });
  }

  createMediaDto(): CreateMediaItemDto {
    return {
      userId: new ObjectId(this.userId),
      summary: Faker.lorem.lines(),
      title: Faker.lorem.sentence(),
      isPlayable: Faker.random.boolean(),
      description: Faker.lorem.lines(),
      category: 'flexibility',
    };
  }

  createMediaItem() {
    const mediaItemMixin = baseEntityMixin(MediaItem);

    return new mediaItemMixin(this.createMediaDto());
  }
}

export function userDataFactory(userFactory: UserFactory) {
  const userMixin = baseEntityMixin(User);
  const playlistMixin = baseEntityMixin(Playlist);

  const userDto = userFactory.createUserDto();

  const user = new userMixin(userDto);

  const playlistDto = R.range(1, DataFn.number(4)).map(() => new playlistMixin());

  const media = R.range(1, DataFn.number(10)).map(() => userFactory.createMediaDto());

  return { playlistDto, user, media };
}
``;

class ConcreteMedia extends DataFn {}

export function playlistMediaFactory() {}

interface ConcretePlaylists {
  CreatePlaylistItem(playlistId: ObjectId, mediaId: ObjectId, userId: ObjectId): CreatePlaylistItemDto;
}

class ConcreteMediaItems extends DataFn {
  createPlayListItem(mediaId: ObjectId, userId: ObjectId, playlistId: ObjectId): CreatePlaylistItemDto {
    return {
      userId,
      playlistId,
      mediaId,
    };
  }
}

class createTags extends DataFn {
  createTag(userId: ObjectId, mediaId: ObjectId) {
    return {
      key: DataFn.key(),
      value: DataFn.value(),
      userId,
      mediaId,
    };
  }
}
