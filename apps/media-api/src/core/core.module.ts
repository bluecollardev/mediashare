import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './database/database.service';

@Global()
@Module({
  imports: [],
  providers: [],
})
export class CoreModule {
  static forRoot(options: {
    mongoPath: string;
    database?: string;
  }): DynamicModule {
    const { mongoPath = '', database = 'mediashare' } = options;
    const providers = [
      { provide: 'URI', useValue: mongoPath },
      { provide: 'DB_NAME', useValue: database },

      DatabaseService,
    ];

    return { module: CoreModule, providers, exports: providers };
  }
}
