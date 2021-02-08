import { Module } from '@nestjs/common';
import { CoreModule } from '../../../../src/core/core.module';

@Module({
  imports: [CoreModule],
  providers: [
    { provide: 'ACCOUNT_COLLECTION', useValue: 'accounts' },
    { provide: 'USER_COLLECTION', useValue: 'users' },
  ],
})
export class UserModule {}
