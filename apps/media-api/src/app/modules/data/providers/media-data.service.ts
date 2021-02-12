import { Inject, Injectable } from '@nestjs/common';
import { MsDataProvider } from 'apps/media-api/src/core/models/data-provider.model';
import {
  DatabaseCollectionType,
  DatabaseService,
} from 'apps/media-api/src/core/providers/database/database.service';
import { MediaRecord } from '../models/media-record.model';

@Injectable()
export class MediaDataService implements MsDataProvider<MediaRecord> {
  get(id: string) {
    const collection = this.collection;

    return this.dbSvc.getRecord({ collection, id });
  }

  update(args: Partial<MediaRecord>) {
    const { id, ...rest } = args;
    const collection = this.collection;

    return this.dbSvc.updateRecord<MediaRecord>({
      collection,
      id,
      query: { ...rest },
    });
  }

  create(args: MediaRecord) {
    const collection = this.collection;

    return this.dbSvc.insertRecord({
      collection,
      record: { ...args },
    });
  }
  constructor(
    @Inject('MEDIA_COLLECTION') private collection: DatabaseCollectionType,
    private dbSvc: DatabaseService
  ) {}
}
