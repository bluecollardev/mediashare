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

/**
 * @export
 * @interface MediaItem
 */
export interface MediaItem {
  /**
   * @type {object}
   * @memberof MediaItem
   */
  _id: object;
  /**
   * @type {string}
   * @memberof MediaItem
   */
  readonly createdAt: string;
  /**
   * @type {string}
   * @memberof MediaItem
   */
  readonly updatedDate?: string;
  /**
   * Created by type is generated by the @CreateDto decorator
   * @type {object}
   * @memberof MediaItem
   */
  createdBy: object;
  /**
   * Created by type is generated by the @CreateDto decorator
   * @type {object}
   * @memberof MediaItem
   */
  userId: object;
  /**
   * @type {boolean}
   * @memberof MediaItem
   */
  isPlayable: boolean;
  /**
   * @type {string}
   * @memberof MediaItem
   */
  summary: string;
  /**
   * @type {string}
   * @memberof MediaItem
   */
  description: string;
  /**
   * @type {string}
   * @memberof MediaItem
   */
  title: string;
  /**
   * @type {string}
   * @memberof MediaItem
   */
  displayFileName: string;
  /**
   * @type {string}
   * @memberof MediaItem
   */
  thumbnail?: string;
  /**
   * @type {string}
   * @memberof MediaItem
   */
  uri: string;
  /**
   * @type {string}
   * @memberof MediaItem
   */
  category: MediaItemCategoryEnum;
}

/**
 * @export
 * @enum {string}
 */
export enum MediaItemCategoryEnum {
  Strength = 'strength',
  Flexibility = 'flexibility',
  Endurance = 'endurance',
}
