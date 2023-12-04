import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagMapping } from './mappers/automapper.profile';
import { TagDataService, TagService } from './tag.service';
import { TagController } from './tag.controller';
import { Tag } from '@mediashare/core/modules/tags/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  controllers: [TagController],
  providers: [TagService, TagDataService, TagMapping],
  exports: [TagService],
})
export class TagModule {}
