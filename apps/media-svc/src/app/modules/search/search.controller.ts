import { MediaItemService } from '../media-item/media-item.service';
import { Controller, Query, Get } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { PlaylistGetResponse } from './search.decorator';
import { PlaylistService } from '../playlist/playlist.service';
import { PlaylistDto } from '../playlist/dto/playlist.dto';

@ApiTags('search')
@Controller('search')
export class SearchController {
  constructor(
    private readonly playlistService: PlaylistService,
    private readonly mediaItemService: MediaItemService
  ) {}

  /**
   * TODO: Type contentType!
   * When we're searching for records, we want to search through public records,
   * records shared from my network, and optionally our own records,
   * although by default we want to hide those.
   * @param target
   * @param query
   * @param tags
   */
  @Get()
  @ApiQuery({ name: 'text', required: false, allowEmptyValue: true })
  @ApiQuery({
    name: 'tags',
    type: String,
    explode: true,
    isArray: true,
    required: false,
    allowEmptyValue: true,
  })
  @PlaylistGetResponse({ type: PlaylistDto, isArray: true })
  async findAll(
    @Query('target') target?: string,
    @Query('text') query?: string,
    @Query('tags') tags?: string[]
  ) {
    const parsedTags = Array.isArray(tags)
      ? tags
      : typeof tags === 'string'
      ? [tags]
      : undefined;
    let results = [];
    switch (target) {
      case 'playlists':
        results = !!(query || tags)
          ? await this.playlistService.search({ query, tags: parsedTags })
          : await this.playlistService.findAll();
        results = results.map((result) => ({
          ...result,
          contentType: 'playlist',
        }));
        break;
      case 'media':
        results = !!(query || tags)
          ? await this.mediaItemService.search({ query, tags: parsedTags })
          : await this.mediaItemService.search({ query: '', tags: [] });
        results = results.map((result) => ({
          ...result,
          contentType: 'mediaItem',
        }));
        break;
      default:
        results = !!(query || tags)
          ? await this.playlistService.search({ query, tags: parsedTags })
          : await this.playlistService.findAll();
        results = results.map((result) => ({
          ...result,
          contentType: 'playlist',
        }));
        break;
    }
    return results;
  }

  @Get('popular')
  @PlaylistGetResponse({ isArray: true })
  async findPopular() {
    return await this.playlistService.getPopular();
  }
}
