import { Module } from '@nestjs/common';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { CognitoAuthModule } from '@nestjs-cognito/auth';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { UserConnectionModule } from './modules/user-connection/user-connection.module';
import { appConfig, dbConfig, appValidationSchema } from './app.configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'development.env',
      load: [appConfig, dbConfig],
      validationSchema: appValidationSchema,
      cache: true,
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      ignoreEnvVars: process.env.NODE_ENV !== 'production',
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'mediashare-test',
      username: 'mongodb',
      password: '',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      ssl: false,
      autoLoadEntities: true,
      synchronize: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      logging: true,
      dropSchema: true,
    }),
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
    UserModule,
    UserConnectionModule,
    LoggerModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
