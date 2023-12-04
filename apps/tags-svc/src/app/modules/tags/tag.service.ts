import { PinoLogger } from 'nestjs-pino';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { ConfigService } from '@nestjs/config';
import { MongoRepository } from 'typeorm';
import { MongoFindManyOptions } from 'typeorm/find-options/mongodb/MongoFindManyOptions';
import { MongoFindOneOptions } from 'typeorm/find-options/mongodb/MongoFindOneOptions';

import { IdType } from '@mediashare/shared';
import { DataService } from '@mediashare/core/services';
import {
  ApiErrorResponse,
  ApiErrorResponses,
} from '@mediashare/core/errors/api-error';

import { Tag } from '@mediashare/core/modules/tags/tag.entity';
import { CreateTagDto } from '@mediashare/core/modules/tags/dto/create-tag.dto';
import { UpdateTagDto } from '@mediashare/core/modules/tags/dto/update-tag.dto';
import { TagDto } from '@mediashare/core/modules/tags/dto/tag.dto';

@Injectable()
export class TagDataService extends DataService<Tag, MongoRepository<Tag>> {
  constructor(
    @InjectRepository(Tag) repository: MongoRepository<Tag>,
    logger: PinoLogger,
    private configService: ConfigService
  ) {
    super(repository, logger);
  }
}

@Injectable()
export class TagService {
  constructor(
    public dataService: TagDataService,
    @InjectMapper() private readonly classMapper: Mapper
  ) {}

  async create(createTagDto: CreateTagDto): Promise<TagDto> {
    const errors = await this.dataService.validateDto(
      CreateTagDto,
      createTagDto
    );
    if (errors)
      throw new ApiErrorResponse(ApiErrorResponses.ValidationError(errors));
    const entity = await this.classMapper.mapAsync(
      createTagDto,
      CreateTagDto,
      Tag
    );
    const result = await this.dataService.create(entity);
    return await this.classMapper.mapAsync(result, Tag, TagDto);
  }

  async update(tagId: IdType, updateTagDto: UpdateTagDto): Promise<TagDto> {
    const errors = await this.dataService.validateDto(
      UpdateTagDto,
      updateTagDto
    );
    if (errors)
      throw new ApiErrorResponse(ApiErrorResponses.ValidationError(errors));
    const entity = await this.classMapper.mapAsync(
      updateTagDto,
      UpdateTagDto,
      Tag
    );
    const result = await this.dataService.update(tagId, entity);
    return await this.classMapper.mapAsync(result, Tag, TagDto);
  }

  async remove(id: IdType) {
    return await this.dataService.remove(id);
  }

  async findOne(id: IdType) {
    const entity = await this.dataService.findOne(id);
    return await this.classMapper.mapAsync(entity, Tag, TagDto);
  }

  async findAll() {
    return await this.dataService.findAll();
  }

  async findByQuery(query: MongoFindOneOptions<Tag>) {
    return await this.dataService.findByQuery(query);
  }

  async findAllByQuery(query: MongoFindManyOptions<Tag>) {
    return await this.dataService.findAllByQuery(query);
  }
}
