import { Inject, Injectable } from '@nestjs/common';
import { Account } from '@core-lib';

import { MsDataProvider } from '../../../../core/models/data-provider.model';
import {
  DatabaseCollectionType,
  DatabaseService,
} from '../../../../core/providers/database/database.service';

@Injectable({})
export class AccountDataService implements MsDataProvider<Account> {
  // create: () => Account;
  // update: () => Account;

  constructor(
    @Inject('ACCOUNT_COLLECTION') private collection: DatabaseCollectionType,
    private dbService: DatabaseService
  ) {
    if (!this.collection)
      throw new Error(
        `no collection instantiated for ${this.constructor.name}`
      );
  }
  create(args: { uid: string }) {
    const { uid } = args;
    const collection = this.collection;

    return this.dbService.insertRecord<Account>({
      collection,
      record: { uid },
    });
  }

  update(args: { uid: string; id: string }) {
    const { id, uid } = args;
    const collection = this.collection;

    return this.dbService.updateRecord<Account>({
      collection,
      id,
      query: { uid },
    });
  }

  get(id: string): Promise<Account> {
    const collection = this.collection;

    return this.dbService.getRecord({ collection, id });
  }
}
