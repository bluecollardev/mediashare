import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthUser } from './auth/auth-user.entity';

import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
