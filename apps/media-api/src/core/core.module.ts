import { DynamicModule, Global, Module } from '@nestjs/common';

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
    ];

    return { module: CoreModule, providers, exports: providers };
  }
}
