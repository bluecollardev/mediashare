// tslint:disable
/**
 * Mediashare
 * Media Share API
 *
 * The version of the OpenAPI document: 1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import { Playlist, PlaylistFromJSON, PlaylistToJSON } from './';

/**
 *
 * @export
 * @interface CreatePlaylistResponseDto
 */
export interface CreatePlaylistResponseDto {
  /**
   *
   * @type {Playlist}
   * @memberof CreatePlaylistResponseDto
   */
  readonly playlist: Playlist;
  /**
   *
   * @type {Array<string>}
   * @memberof CreatePlaylistResponseDto
   */
  playlistItems: Array<string>;
}

export function CreatePlaylistResponseDtoFromJSON(json: any): CreatePlaylistResponseDto {
  return {
    playlist: PlaylistFromJSON(json['playlist']),
    playlistItems: json['playlistItems'],
  };
}

export function CreatePlaylistResponseDtoToJSON(value?: CreatePlaylistResponseDto): any {
  if (value === undefined) {
    return undefined;
  }
  return {
    playlistItems: value.playlistItems,
  };
}
