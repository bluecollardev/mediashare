import { FactoryProvider, ModuleMetadata } from '@nestjs/common/interfaces';

export const SES_MODULE_OPTIONS = 'SES_MODULE_OPTIONS';

export enum SesModuleOptionKeys {
  region = 'region',
  akiKey = 'akiKey',
  secret = 'secret',
}

export type SesModuleOptions = {
  [key in SesModuleOptionKeys]: string;
};

export type SesModuleAsyncOptions = Pick<ModuleMetadata, 'imports'> & Pick<FactoryProvider<SesModuleOptions>, 'useFactory' | 'inject'>;
