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

import { MediaItem, UserDto } from './';

/**
 * @export
 * @interface PlaylistResponseDto
 */
export interface PlaylistResponseDto {
  /**
   * @type {string}
   * @memberof PlaylistResponseDto
   */
  readonly _id: string;
  /**
   * @type {string}
   * @memberof PlaylistResponseDto
   */
  readonly createdAt: string;
  /**
   * @type {string}
   * @memberof PlaylistResponseDto
   */
  readonly updatedDate?: string;
  /**
   * Created by type is generated by the @CreateDto decorator
   * @type {string}
   * @memberof PlaylistResponseDto
   */
  createdBy: string;
  /**
   * Created by type is generated by the @CreateDto decorator
   * @type {string}
   * @memberof PlaylistResponseDto
   */
  userId: string;
  /**
   * @type {string}
   * @memberof PlaylistResponseDto
   */
  title: string;
  /**
   * @type {string}
   * @memberof PlaylistResponseDto
   */
  description: string;
  /**
   * @type {Array<string>}
   * @memberof PlaylistResponseDto
   */
  mediaIds: Array<string> | null;
  /**
   * @type {string}
   * @memberof PlaylistResponseDto
   */
  category: PlaylistResponseDtoCategoryEnum;
  /**
   * @type {Array<MediaItem>}
   * @memberof PlaylistResponseDto
   */
  mediaItems: Array<MediaItem>;
  /**
   * @type {UserDto}
   * @memberof PlaylistResponseDto
   */
  user: UserDto;
}

/**
 * @export
 * @enum {string}
 */
export enum PlaylistResponseDtoCategoryEnum {
  Rehab = 'Rehab',
  Builder = 'Builder',
  Warmup = 'Warmup',
}
