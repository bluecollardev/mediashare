import { Module } from '@nestjs/common';
import { CoreModule } from '../../../../src/core/core.module';
import { AccountDataService } from './providers/account-data.service';
import { UserDataService } from './providers/user-data.service';

@Module({
  imports: [CoreModule],
  providers: [
    { provide: 'ACCOUNT_COLLECTION', useValue: 'accounts' },
    { provide: 'USER_COLLECTION', useValue: 'users' },
    AccountDataService,
    UserDataService,
  ],
})
export class UserModule {}
