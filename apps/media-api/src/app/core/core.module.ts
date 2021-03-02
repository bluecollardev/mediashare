import { DynamicModule, Global, Module } from '@nestjs/common';

@Module({
  imports: [],

})
export class CoreModule {
  static forRoot(): DynamicModule {
    const providers = [
      { provide: 'LONG_STRING', useValue: 255 },
      { provide: 'STRING', useValue: 50 },
    ];



    return { module: CoreModule, providers, exports: providers };
  }
}
