import { DynamicModule, Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_CLIENT',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 4000,
        },
      },
    ]),
  ],
  exports: [ClientsModule],
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
