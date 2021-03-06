import { Controller, Get, Param, Delete, Logger } from '@nestjs/common';
import { ShareItemService } from '../../modules/share-item/services/share-item.service';
import { GetUser } from '../../core/decorators/user.decorator';
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
  async findAll(@GetUser() user: AuthUserInterface) {
    Logger.warn(user);
    const sharedItems = await this.shareItemService.findShareItemsByUserId(
      typeof user._id === 'string' ? user._id : user._id.toHexString()
    );

    return sharedItems;
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
