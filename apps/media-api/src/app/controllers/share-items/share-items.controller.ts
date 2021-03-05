import { Controller, Get, Param, Delete, Logger } from '@nestjs/common';
import { ShareItemService } from '../../modules/share-item/services/share-item.service';
import { GetUser } from '../../core/decorators/user.decorator';
import { AuthUserInterface } from '@core-lib';
import { ApiTags } from '@nestjs/swagger';
import { ShareItemGetResponse } from './share-items.decorator';

@ApiTags('share-items')
@Controller('share-items')
export class ShareItemsController {
  constructor(private readonly shareItemService: ShareItemService) {}

  @ShareItemGetResponse({ isArray: true })
  @Get()
  findAll(@GetUser() user: AuthUserInterface) {
    Logger.warn(user);
    return this.shareItemService.findShareItemsByUserId(
      typeof user._id === 'string' ? user._id : user._id.toHexString()
    );
  }

  @ShareItemGetResponse()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shareItemService.findOne(id);
  }

  @ShareItemGetResponse()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shareItemService.remove(id);
  }
}
