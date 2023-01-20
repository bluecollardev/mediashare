import { ApiArray, ApiDecoratorOptions } from '@mediashare/shared';
import { MediaVisibilityType } from '@core-lib';

export class MediaVisibilityDto {
  @ApiArray(<ApiDecoratorOptions>{ type: Array })
  visibilities: MediaVisibilityType[];
}
