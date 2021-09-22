import { Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { LikesService } from './likes.service';
import { ObjectIdPipe } from '@mediashare/shared';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { GetUserId } from '../../core/decorators/user.decorator';
import { LikeResponse } from './decorators/likes.decorator';

@ApiTags('likes')
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post('playlist/:playlistId')
  @LikeResponse()
  @ApiParam({ name: 'playlistId', type: String, required: true })
  createPlaylistView(@Param('playlistId', new ObjectIdPipe()) playlistId: ObjectId, @GetUserId() createdBy: ObjectId) {
    return this.likesService.create({ playlistId, createdBy });
  }

  @Post('mediaItem/:mediaId')
  @LikeResponse()
  @ApiParam({ name: 'mediaId', type: String, required: true })
  createMediaView(@Param('mediaId', new ObjectIdPipe()) mediaId: ObjectId, @GetUserId() createdBy: ObjectId) {
    return this.likesService.create({ mediaId, createdBy });
  }

  @Delete(':likeId')
  @ApiParam({ name: 'mediaId', type: String, required: true })
  @LikeResponse()
  remove(@Param('likeId') likeId: string) {
    return this.likesService.remove(likeId);
  }
}
