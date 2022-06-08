import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration, { appValidationSchema } from './configuration';
import databaseConfiguration from './database.configuration';
import { AppConfigService } from './app-config.provider';
/**
 * Import and provide app configuration related classes.
 *
 * @module
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'development.env',
      load: [configuration, databaseConfiguration],
      validationSchema: appValidationSchema,
      cache: true,
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      ignoreEnvVars: process.env.NODE_ENV !== 'production',
    }),
  ],
  providers: [ConfigService, AppConfigService],
  exports: [ConfigService, AppConfigService],
})
export class AppConfigModule {}
