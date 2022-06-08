import { Controller, Param, Get, Delete } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { ObjectIdPipe } from '@mediashare/shared';
import RouteTokens from '@api-modules/app-config/constants/open-api.constants';
import { TagService } from './tag.service';
import { TagGetResponse } from './tag.decorator';

@ApiTags('tags')
@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  @TagGetResponse({ isArray: true })
  async findAll() {
    return this.tagService.findAll();
  }

  @Get(RouteTokens.TAG_ID)
  @ApiParam({ name: 'tagId', type: String, required: true })
  @TagGetResponse()
  async findOne(@Param('tagId', new ObjectIdPipe()) tagId: ObjectId) {
    return await this.tagService.findOne(tagId);
  }

  @Delete(RouteTokens.TAG_ID)
  @ApiParam({ name: 'tagId', type: String, required: true })
  @TagGetResponse()
  async remove(@Param('tagId', new ObjectIdPipe()) tagId: ObjectId) {
    return await this.tagService.remove(tagId);
  }
}
