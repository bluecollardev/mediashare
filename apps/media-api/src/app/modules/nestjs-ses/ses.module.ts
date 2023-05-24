import { DynamicModule, Module, Provider } from '@nestjs/common';
import { SES_MODULE_OPTIONS, SesModuleAsyncOptions } from './ses.struct';

@Module({})
export class SesModule {
  static registerAsync(options: SesModuleAsyncOptions[]): DynamicModule {
    const providers: Provider[] = options.reduce((accProviders: Provider[], item) =>
      accProviders.concat(this.createAsyncProviders(item))
    , []);
    const imports = options.reduce(
      (accImports, option) =>
        option.imports && !accImports.includes(option.imports)
          ? accImports.concat(option.imports)
          : accImports,
      [],
    );
    return {
      module: SesModule,
      imports,
      providers: providers,
      exports: providers,
    };
  }

  private static createAsyncProviders(
    options: SesModuleAsyncOptions,
  ): Provider[] {
    return [this.createAsyncOptionsProvider(options)];
  }

  private static createAsyncOptionsProvider(
    options: SesModuleAsyncOptions,
  ): Provider {
    return {
      provide: SES_MODULE_OPTIONS,
      useFactory: this.createFactoryWrapper(options.useFactory),
      inject: options.inject || [],
    };
  }

  private static createFactoryWrapper(
    useFactory: SesModuleAsyncOptions['useFactory'],
  ) {
    return async (...args: any[]) => {
      return useFactory(...args);
    };
  }
}
