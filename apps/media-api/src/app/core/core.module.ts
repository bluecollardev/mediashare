import { DynamicModule, Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [],
  exports: [],
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
