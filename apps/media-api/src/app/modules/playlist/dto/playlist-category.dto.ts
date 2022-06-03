import { ApiArray, ApiDecoratorOptions } from '@mediashare/shared';
import { PlaylistCategoryType } from '@core-lib';

export class PlaylistCategoryDto {
  @ApiArray(<ApiDecoratorOptions>{ type: Array })
  categories: PlaylistCategoryType[];
}
