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

import { PlaylistCategoryType, TagKeyValue } from './';

/**
 * @export
 * @interface CreatePlaylistDto
 */
export interface CreatePlaylistDto {
  /**
   * @type {string}
   * @memberof CreatePlaylistDto
   */
  title: string;
  /**
   * @type {string}
   * @memberof CreatePlaylistDto
   */
  description: string;
  /**
   * @type {string}
   * @memberof CreatePlaylistDto
   */
  imageSrc?: string;
  /**
   * @type {PlaylistCategoryType}
   * @memberof CreatePlaylistDto
   */
  category: PlaylistCategoryType;
  /**
   * @type {Array<string>}
   * @memberof CreatePlaylistDto
   */
  mediaIds: Array<string>;
  /**
   * @type {Array<TagKeyValue>}
   * @memberof CreatePlaylistDto
   */
  tags: Array<TagKeyValue> | null;
}
