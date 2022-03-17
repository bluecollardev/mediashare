import { MediaCategoryType } from '@core-lib';
import { ApiArray, ApiDecoratorOptions } from '@mediashare/shared';

export class MediaCategoryDto {
  @ApiArray(<ApiDecoratorOptions>{ type: Array })
  categories: MediaCategoryType[];
}
