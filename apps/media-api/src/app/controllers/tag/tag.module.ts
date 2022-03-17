import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagController } from './tag.controller';
import { TagModule } from '../../modules/tag/tag.module';
import { JwtStrategy } from '../../modules/auth/jwt.strategy';
import { AuthModule } from '../../modules/auth/auth.module';
import { Tag } from '../../modules/tag/entities/tag.entity';

@Module({
  imports: [TagModule, TypeOrmModule.forFeature([Tag]), AuthModule],
  controllers: [TagController],
  providers: [JwtStrategy],
})
export class TagModule {}
