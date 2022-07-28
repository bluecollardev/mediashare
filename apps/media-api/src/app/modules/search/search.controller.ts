import { Controller, Query, Get } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { PlaylistGetResponse } from './search.decorator';
import { PlaylistService } from '@api-modules/playlist/playlist.service';
import { PlaylistResponseDto } from '@api-modules/playlist/dto/playlist-response.dto';

@ApiTags('search')
@Controller('search')
export class SearchController {
  constructor(private readonly playlistService: PlaylistService) {}

  /**
   * When we're searching for records, we want to search through public records,
   * records shared from my network, and optionally our own records,
   * although by default we want to hide those.
   * @param query
   * @param tags
   */
  @Get()
  @ApiQuery({ name: 'text', required: false, allowEmptyValue: true })
  @ApiQuery({ name: 'tags', type: String, explode: true, isArray: true, required: false, allowEmptyValue: true })
  @PlaylistGetResponse({ type: PlaylistResponseDto, isArray: true })
  async findAll(@Query('text') query?: string, @Query('tags') tags?: string[]) {
    const parsedTags = Array.isArray(tags) ? tags : typeof tags === 'string' ? [tags] : undefined;
    return query || tags ? await this.playlistService.search({ query, tags: parsedTags }) : await this.playlistService.findAll();
  }

  @Get('popular')
  @PlaylistGetResponse({ isArray: true })
  async findPopular() {
    return await this.playlistService.getPopular();
  }
}
