import { ApiArray, ApiDecoratorOptions } from '@mediashare/shared';
import { PlaylistVisibilityType } from '../../../core/models';

export class PlaylistVisibilityDto {
  @ApiArray(<ApiDecoratorOptions>{ type: Array })
  visibilities: PlaylistVisibilityType[];
}
