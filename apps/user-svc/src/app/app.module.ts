import { CognitoModuleOptions } from '@nestjs-cognito/core';
import { CognitoTestingModule } from '@nestjs-cognito/testing';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { LoggerModule } from 'nestjs-pino';
import { CognitoAuthModule } from '@nestjs-cognito/auth';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { TypeOrmModuleFactory } from '@mediashare/core/factories';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { UserConnectionModule } from './modules/user-connection/user-connection.module';
import { EmailModule } from './modules/email/email.module';
import { appConfig, dbConfig, appValidationSchema } from './app.configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'test.env',
      load: [appConfig, dbConfig],
      validationSchema: appValidationSchema,
      cache: true,
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      ignoreEnvVars: process.env.NODE_ENV !== 'production',
    }),
    TypeOrmModuleFactory(),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    CognitoAuthModule.register({
      identityProvider: {
        region: 'us-west-2',
      },
      jwtVerifier: {
        userPoolId: process.env.COGNITO_USER_POOL_ID || 'us-west-2_NIibhhG4d',
        clientId: process.env.COGNITO_CLIENT_ID || '1n3of997k64in850vgp1hn849v',
        tokenUse: 'id',
      },
    }),
    // TODO: Switch CognitoAuthModule + CognitoTestingModule depending on whether we're in CI test mode
    CognitoTestingModule.register({
      identityProvider: {
        region: 'us-west-2',
      },
      jwtVerifier: {
        userPoolId: process.env.COGNITO_USER_POOL_ID || 'us-west-2_NIibhhG4d',
        clientId: process.env.COGNITO_CLIENT_ID || '1n3of997k64in850vgp1hn849v',
        tokenUse: 'id',
      },
    } as CognitoModuleOptions),
    LoggerModule.forRoot(),
    UserModule,
    UserConnectionModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(
    private configService: ConfigService,
    private dataSource: DataSource
  ) {
    const appConfig = configService.get('app');
    const dbConfig = configService.get('db');
    console.log(appConfig);
    console.log(dbConfig);
  }
}
