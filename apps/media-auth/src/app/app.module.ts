import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthUser } from './auth/auth-user.entity';

import { AuthModule } from './auth/auth.module';
import configuration from './configuration';
const ormConfig = {
  type: 'postgres' as const,
  // url: 'postgres://msuser:msuserpass@postgres/msuser',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRESS_PORT) || 5432,
  username: process.env.POSTGRES_USERNAME || 'msuser',
  password: process.env.POSTGRES_PASSWORD || 'msuserpass',
  database: process.env.POSTGRES_DB || 'msuser',
  synchronize: true,
  ssl: false,
  entities: [AuthUser],
  connectTimeoutMS: 2000,
  logNotifications: true
};

console.log(ormConfig);

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: 'development.env',
      ignoreEnvVars: process.env.NODE_ENV === 'development',
      ignoreEnvFile: process.env.NODE_ENV !== 'development'
    }),
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    TypeOrmModule.forRoot(ormConfig),
    AuthModule
  ],
  controllers: [],
  providers: [ConfigService]
})
export class AppModule {}
