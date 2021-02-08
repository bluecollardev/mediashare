import { Playlist } from '@core-lib';
import { Injectable, Inject } from '@nestjs/common';
import { MsDataProvider } from 'apps/media-api/src/core/models/data-provider.model';
import {
  DatabaseCollectionType,
  DatabaseService,
} from 'apps/media-api/src/core/providers/database/database.service';

type PlaylistRecord = Pick<Playlist, 'title' | 'tags' | 'userId'>;

@Injectable()
export class PlaylistDataService implements MsDataProvider<PlaylistRecord> {
  get(id: string) {
    const collection = this.collection;

    return this.dbSvc.getRecord({ collection, id });
  }

  update(args: Partial<Playlist>) {
    const { id, ...rest } = args;
    const collection = this.collection;

    return this.dbSvc.updateRecord<Playlist>({
      collection,
      id,
      query: { ...rest },
    });
  }

  create(args: PlaylistRecord) {
    const { title = null, userId = null, tags = [] } = args;

    const collection = this.collection;

    return this.dbSvc.insertRecord({
      collection,
      record: { title, userId, tags },
    });
  }

  constructor(
    @Inject('PLAYLIST_COLLECTION') private collection: DatabaseCollectionType,
    private dbSvc: DatabaseService
  ) {}
}
