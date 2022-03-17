import { PlaylistCategoryType } from '@core-lib';
import { ApiArray, ApiDecoratorOptions } from '@mediashare/shared';

export class PlaylistCategoryDto {
  @ApiArray(<ApiDecoratorOptions>{ type: Array })
  categories: PlaylistCategoryType[];
}
