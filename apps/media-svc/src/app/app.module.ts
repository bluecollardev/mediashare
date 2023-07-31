import { Module } from '@nestjs/common';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { CognitoAuthModule } from '@nestjs-cognito/auth';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MediaItemModule } from './modules/media-item/media-item.module';
import { PlaylistItemModule } from './modules/playlist-item/playlist-item.module';
import { PlaylistModule } from './modules/playlist/playlist.module';
import { SearchModule } from './modules/search/search.module';
import { ShareItemModule } from './modules/share-item/share-item.module';
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
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        // db.type return type messes up things and its not exported
        type: configService.get<string>('db.type') as any,
        host: configService.get<string>('db.host'),
        port: configService.get<number>('db.port'),
        database: configService.get<string>('db.database'),
        username: configService.get<string>('db.username'),
        password: configService.get<string>('db.password'),
        entities: configService.get<[]>('db.entities'),
        ssl: configService.get<boolean>('db.ssl'),
        autoLoadEntities: configService.get<boolean>('db.autoLoadEntities'),
        synchronize: configService.get<boolean>('db.synchronize'),
        useUnifiedTopology: configService.get<boolean>('db.useUnifiedTopology'),
        useNewUrlParser: configService.get<boolean>('db.useNewUrlParser'),
        logging: configService.get<boolean>('db.logging'),
        dropSchema: configService.get<boolean>('db.dropSchema'),
      }),
      inject: [ConfigService],
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
    LoggerModule.forRoot(),
    MediaItemModule,
    PlaylistItemModule,
    PlaylistModule,
    SearchModule,
    ShareItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {
  constructor(private configService: ConfigService) {}
}
