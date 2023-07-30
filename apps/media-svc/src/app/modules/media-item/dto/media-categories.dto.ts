import { ApiArray, ApiDecoratorOptions } from '@mediashare/shared';
import { MediaVisibilityType } from '../../../core/models';

export class MediaVisibilityDto {
  @ApiArray(<ApiDecoratorOptions>{ type: Array })
  visibilities: MediaVisibilityType[];
}
