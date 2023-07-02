// import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMapping } from './mappers/automapper.profile';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService, UserDataService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [UserService, UserDataService, UserMapping],
  exports: [UserService],
})
export class UserModule {}
/* export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtDecodeMiddleware).forRoutes(UsersController);
  }
} */
