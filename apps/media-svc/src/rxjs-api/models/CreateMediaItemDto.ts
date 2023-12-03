// tslint:disable
/**
 * Media Service
 * Media Service
 *
 * The version of the OpenAPI document: 0.0.1
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

/**
 * @export
 * @interface CreateMediaItemDto
 */
export interface CreateMediaItemDto {
  /**
   * @type {string}
   * @memberof CreateMediaItemDto
   */
  key: string;
  /**
   * @type {string}
   * @memberof CreateMediaItemDto
   */
  userId: string;
  /**
   * @type {string}
   * @memberof CreateMediaItemDto
   */
  title: string;
  /**
   * @type {string}
   * @memberof CreateMediaItemDto
   */
  summary?: string;
  /**
   * @type {string}
   * @memberof CreateMediaItemDto
   */
  description: string;
  /**
   * @type {string}
   * @memberof CreateMediaItemDto
   */
  uri: string;
  /**
   * @type {string}
   * @memberof CreateMediaItemDto
   */
  imageSrc?: string;
  /**
   * @type {boolean}
   * @memberof CreateMediaItemDto
   */
  isPlayable?: boolean;
  /**
   * @type {string}
   * @memberof CreateMediaItemDto
   */
  visibility: CreateMediaItemDtoVisibilityEnum;
  /**
   * @type {string}
   * @memberof CreateMediaItemDto
   */
  eTag?: string;
}

/**
 * @export
 * @enum {string}
 */
export enum CreateMediaItemDtoVisibilityEnum {
  Private = 'private',
  Shared = 'shared',
  Subscription = 'subscription',
  Public = 'public',
}
