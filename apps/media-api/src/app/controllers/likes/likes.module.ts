import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { AuthModule } from '../../modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Like]), AuthModule],
  controllers: [LikesController],
  providers: [LikesService]
})
export class LikesModule {}
