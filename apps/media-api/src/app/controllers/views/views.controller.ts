import { Controller, Post, Param } from '@nestjs/common';
import { ViewsService } from './views.service';
import { ViewsPostResponse } from './decorators/views.decorator';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { ObjectIdPipe } from '@mediashare/shared';
import { ObjectId } from 'mongodb';
import { GetUserId } from '../../core/decorators/user.decorator';

@ApiTags('views')
@Controller({ path: ['views'] })
export class ViewsController {
  constructor(private readonly viewsService: ViewsService) {}

  @Post('playlist/:playlistId')
  @ViewsPostResponse()
  @ApiParam({ name: 'playlistId', type: String, required: true })
  createPlaylistView(@Param('playlistId', new ObjectIdPipe()) playlistId: ObjectId, @GetUserId() createdBy: ObjectId) {
    return this.viewsService.create({ playlistId, createdBy });
  }

  @Post('mediaItem/:mediaId')
  @ViewsPostResponse()
  @ApiParam({ name: 'mediaId', type: String, required: true })
  createMediaView(@Param('mediaId', new ObjectIdPipe()) mediaId: ObjectId, @GetUserId() createdBy: ObjectId) {
    return this.viewsService.create({ mediaId, createdBy });
  }
}
