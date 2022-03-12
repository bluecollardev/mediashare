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

import { PlaylistCategoryType } from './';

/**
 * @export
 * @interface Playlist
 */
export interface Playlist {
  /**
   * @type {string}
   * @memberof Playlist
   */
  readonly _id: string;
  /**
   * @type {string}
   * @memberof Playlist
   */
  readonly createdAt: string;
  /**
   * @type {string}
   * @memberof Playlist
   */
  readonly updatedDate?: string;
  /**
   * Created by type is generated by the @CreateDto decorator
   * @type {string}
   * @memberof Playlist
   */
  createdBy: string;
  /**
   * Created by type is generated by the @CreateDto decorator
   * @type {string}
   * @memberof Playlist
   */
  userId: string;
  /**
   * @type {string}
   * @memberof Playlist
   */
  title: string;
  /**
   * @type {string}
   * @memberof Playlist
   */
  description: string;
  /**
   * @type {string}
   * @memberof Playlist
   */
  imageSrc: string;
  /**
   * @type {Array<string>}
   * @memberof Playlist
   */
  mediaIds: Array<string> | null;
  /**
   * @type {PlaylistCategoryType}
   * @memberof Playlist
   */
  category: PlaylistCategoryType;
}
