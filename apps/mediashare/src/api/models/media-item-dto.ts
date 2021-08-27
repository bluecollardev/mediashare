/* tslint:disable */
/* eslint-disable */
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
 *
 * @export
 * @interface MediaItemDto
 */
export interface MediaItemDto {
  /**
   *
   * @type {string}
   * @memberof MediaItemDto
   */
  _id: string;
  /**
   *
   * @type {string}
   * @memberof MediaItemDto
   */
  createdAt: string;
  /**
   *
   * @type {string}
   * @memberof MediaItemDto
   */
  updatedDate?: string;
  /**
   * Created by type is generated by the @CreateDto decorator
   * @type {string}
   * @memberof MediaItemDto
   */
  createdBy: string;
  /**
   * Created by type is generated by the @CreateDto decorator
   * @type {string}
   * @memberof MediaItemDto
   */
  userId: string;
  /**
   *
   * @type {boolean}
   * @memberof MediaItemDto
   */
  isPlayable: boolean;
  /**
   *
   * @type {string}
   * @memberof MediaItemDto
   */
  summary: string;
  /**
   *
   * @type {string}
   * @memberof MediaItemDto
   */
  description: string;
  /**
   *
   * @type {string}
   * @memberof MediaItemDto
   */
  title: string;
  /**
   *
   * @type {string}
   * @memberof MediaItemDto
   */
  uri: string;
  /**
   *
   * @type {string}
   * @memberof MediaItemDto
   */
  category: MediaItemDtoCategoryEnum;
  /**
   *
   * @type {string}
   * @memberof MediaItemDto
   */
  thumbnail: string;
  /**
   *
   * @type {string}
   * @memberof MediaItemDto
   */
  author: string;
}

/**
 * @export
 * @enum {string}
 */
export enum MediaItemDtoCategoryEnum {
  Strength = 'strength',
  Flexibility = 'flexibility',
  Endurance = 'endurance',
}
