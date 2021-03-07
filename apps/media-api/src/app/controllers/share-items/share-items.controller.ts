import { Controller, Get, Param, Delete, Logger } from '@nestjs/common';
import { ShareItemService } from '../../modules/share-item/services/share-item.service';
import { GetUser, GetUserId } from '../../core/decorators/user.decorator';
import { AuthUserInterface } from '@core-lib';
import { ApiTags } from '@nestjs/swagger';
import { ShareItemGetResponse } from './share-items.decorator';
import { ObjectIdPipe } from '@mediashare/shared';
import { ObjectId } from 'mongodb';

@ApiTags('share-items')
@Controller('share-items')
export class ShareItemsController {
  constructor(private readonly shareItemService: ShareItemService) {}

  @ShareItemGetResponse({ isArray: true })
  @Get()
  async findAll(@GetUserId() userId: ObjectId) {
    const [sharedMedia, sharedPlaylists] = await Promise.all(this.shareItemService.findShareItemsByUserId(userId));

    return { sharedMedia, sharedPlaylists };
  }

  @ShareItemGetResponse()
  @Get(':id')
  findOne(@Param('id', ObjectIdPipe) id: ObjectId) {
    return this.shareItemService.findOne(id);
  }

  @ShareItemGetResponse()
  @Delete(':id')
  remove(@Param('id', ObjectIdPipe) id: ObjectId) {
    return this.shareItemService.remove(id);
  }
}
