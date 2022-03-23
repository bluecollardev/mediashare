import { ObjectIdPipe } from '@mediashare/shared';
import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import RouteTokens from '@api-modules/app-config/constants/open-api.constants';
import { TagService } from '@api-modules/tag/services/tag.service';
import { TagGetResponse } from './tags.decorator';

@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagService: TagService) {}

  @TagGetResponse({ isArray: true })
  @Get()
  async findAll() {
    return this.tagService.findAll();
  }

  @TagGetResponse()
  @Get(RouteTokens.TAG_ID)
  @ApiParam({ name: 'tagId', type: String, required: true })
  async findOne(@Param('tagId', new ObjectIdPipe()) tagId: ObjectId) {
    return await this.tagService.findOne(tagId);
  }

  @TagGetResponse()
  @Delete(RouteTokens.TAG_ID)
  @ApiParam({ name: 'tagId', type: String, required: true })
  async remove(@Param('tagId', new ObjectIdPipe()) tagId: ObjectId) {
    return await this.tagService.remove(tagId);
  }
}
