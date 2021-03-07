import { Controller, Get, Param, Delete } from '@nestjs/common';
import { ShareItemService } from '../../modules/share-item/services/share-item.service';
import { GetUserId } from '../../core/decorators/user.decorator';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { ShareItemGetResponse } from './share-items.decorator';
import { ObjectIdPipe } from '@mediashare/shared';
import { ObjectId } from 'mongodb';
import RouteTokens from '../../modules/app-config.module.ts/constants/open-api.constants';

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
  @Get(RouteTokens.SHARE_ID)
  @ApiParam({ name: 'shareId', type: String, required: true })
  findOne(@Param('shareId', new ObjectIdPipe()) shareId: ObjectId) {
    return this.shareItemService.findOne(shareId);
  }

  @ShareItemGetResponse()
  @Delete(':shareId')
  @ApiParam({ name: 'shareId', type: String, required: true })
  remove(@Param('shareId', new ObjectIdPipe()) shareId: ObjectId) {
    return this.shareItemService.remove(shareId);
  }
}
