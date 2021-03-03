import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthUser } from './auth/auth-user.entity';

import { AuthModule } from './auth/auth.module';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: 'development.env',
      ignoreEnvVars: process.env.NODE_ENV === 'development',
      ignoreEnvFile: process.env.NODE_ENV !== 'development',
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'ms-user',
      password: 'ms-user-pass',
      database: 'ms-user',
      synchronize: true,
      entities: [AuthUser],
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [ConfigService],
})
export class AppModule {}
