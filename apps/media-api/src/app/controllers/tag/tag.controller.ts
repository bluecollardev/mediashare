import { Controller, Get, Param, Delete } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { ObjectIdPipe } from '@mediashare/shared';
import { GetUserId } from '../../core/decorators/user.decorator';
import RouteTokens from '../../modules/app-config/constants/open-api.constants';
import { TagService } from '../../modules/tag/services/tag.service';
import { TagGetResponse } from './tag.decorator';

@ApiTags('tags')
@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @TagGetResponse({ isArray: true })
  @Get()
  async findAll(@GetUserId() userId: ObjectId) {
    return this.tagService.findAll();
  }

  @TagGetResponse()
  @Get(RouteTokens.TAG_ID)
  @ApiParam({ name: 'tagId', type: String, required: true })
  async findOne(@Param('tagId', new ObjectIdPipe()) tagId: ObjectId) {
    return await this.tagService.findOne(tagId);
  }

  @TagGetResponse()
  @Delete(':tagId')
  @ApiParam({ name: 'tagId', type: String, required: true })
  async remove(@Param('tagId', new ObjectIdPipe()) tagId: ObjectId) {
    return await this.tagService.remove(tagId);
  }
}
