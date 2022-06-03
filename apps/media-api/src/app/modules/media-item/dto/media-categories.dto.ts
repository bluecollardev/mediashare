import { ApiArray, ApiDecoratorOptions } from '@mediashare/shared';
import { MediaCategoryType } from '@core-lib';

export class MediaCategoryDto {
  @ApiArray(<ApiDecoratorOptions>{ type: Array })
  categories: MediaCategoryType[];
}
