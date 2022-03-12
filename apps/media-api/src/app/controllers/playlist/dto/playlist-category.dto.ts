import { PlaylistCategoryType } from '@core-lib';
import { ApiArray } from '@mediashare/shared';

export class PlaylistCategoryDto {
  @ApiArray({ type: Array })
  categories: PlaylistCategoryType[];
}
