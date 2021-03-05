import { MediaCategoryType } from '@core-lib';
import { ApiArray } from '@mediashare/shared';

export class MediaCategoryDto {
  @ApiArray({ type: Array })
  categories: MediaCategoryType[];
}
