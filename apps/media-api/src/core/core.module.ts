import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './database/database.service';

@Global()
@Module({
  imports: [],
  providers: [],
  exports: [DatabaseService],
})
export class CoreModule {
  static forRoot(options: { mongoPath: string }): DynamicModule {
    const { mongoPath = '' } = options;
    const providers = [
      { provide: 'CONNECTION', useValue: mongoPath },
      DatabaseService,
    ];

    return { module: CoreModule, providers, exports: providers };
  }
}
