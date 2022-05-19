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

import { MediaCategoryType, TagKeyValue } from './';

/**
 * @export
 * @interface UpdateMediaItemDto
 */
export interface UpdateMediaItemDto {
  /**
   * @type {string}
   * @memberof UpdateMediaItemDto
   */
  readonly _id?: string;
  /**
   * @type {string}
   * @memberof UpdateMediaItemDto
   */
  readonly createdAt?: string;
  /**
   * @type {string}
   * @memberof UpdateMediaItemDto
   */
  readonly updatedDate?: string;
  /**
   * @type {string}
   * @memberof UpdateMediaItemDto
   */
  createdBy?: string;
  /**
   * @type {string}
   * @memberof UpdateMediaItemDto
   */
  userId?: string;
  /**
   * @type {string}
   * @memberof UpdateMediaItemDto
   */
  title?: string;
  /**
   * @type {string}
   * @memberof UpdateMediaItemDto
   */
  summary?: string;
  /**
   * @type {string}
   * @memberof UpdateMediaItemDto
   */
  description?: string;
  /**
   * @type {string}
   * @memberof UpdateMediaItemDto
   */
  uri?: string;
  /**
   * @type {string}
   * @memberof UpdateMediaItemDto
   */
  thumbnail?: string;
  /**
   * @type {boolean}
   * @memberof UpdateMediaItemDto
   */
  isPlayable?: boolean;
  /**
   * @type {MediaCategoryType}
   * @memberof UpdateMediaItemDto
   */
  category?: MediaCategoryType;
  /**
   * @type {Array<TagKeyValue>}
   * @memberof UpdateMediaItemDto
   */
  tags?: Array<TagKeyValue> | null;
}
