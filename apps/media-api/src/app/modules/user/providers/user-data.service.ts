import { Injectable } from '@nestjs/common';

import { User, Account } from '@core-lib';
import { DatabaseService } from '../../../../core/providers/database/database.service';
import { MsDataProvider } from 'apps/media-api/src/core/models/data-provider.model';

@Injectable()
export class UserData implements MsDataProvider<User> {
  constructor(private dbService: DatabaseService) {}

  create(account: Account) {
    const { uid } = account;
  }
}
