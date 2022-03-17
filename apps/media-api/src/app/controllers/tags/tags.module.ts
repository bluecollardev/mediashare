import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from '@api-core/entities/tag.entity';
import { AuthModule } from '@api-modules/auth/auth.module';
import { JwtStrategy } from '@api-modules/auth/jwt.strategy';
import { TagModule } from '@api-modules/tag/tag.module';
import { TagsController } from './tags.controller';

@Module({
  imports: [TagModule, TypeOrmModule.forFeature([Tag]), AuthModule],
  controllers: [TagsController],
  providers: [JwtStrategy],
})
export class TagsModule {}
