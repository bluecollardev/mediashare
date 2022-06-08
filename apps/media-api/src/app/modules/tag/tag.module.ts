import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@api-modules/auth/auth.module';
import { JwtStrategy } from '@api-modules/auth/jwt.strategy';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { Tag } from '@api-core/entities/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tag]), AuthModule],
  controllers: [TagController],
  providers: [JwtStrategy, TagService],
})
export class TagModule {}
