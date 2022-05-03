import { DynamicModule, Module } from '@nestjs/common';

@Module({
  imports: [],
  exports: [],
})
export class CoreModule {
  static forRoot(): DynamicModule {
    // TODO: Ask sean what the point of these are!
    const providers = [
      { provide: 'LONG_STRING', useValue: 20000 },
      { provide: 'STRING', useValue: 100 },
    ];

    return { module: CoreModule, providers, exports: providers };
  }
}
