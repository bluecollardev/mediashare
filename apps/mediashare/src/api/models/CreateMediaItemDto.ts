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
 * @interface CreateMediaItemDto
 */
export interface CreateMediaItemDto {
  /**
   * @type {string}
   * @memberof CreateMediaItemDto
   */
  readonly createdAt: string;
  /**
   * Created by type is generated by the @CreateDto decorator
   * @type {object}
   * @memberof CreateMediaItemDto
   */
  createdBy: object;
  /**
   * Created by type is generated by the @CreateDto decorator
   * @type {object}
   * @memberof CreateMediaItemDto
   */
  userId: object;
  /**
   * @type {boolean}
   * @memberof CreateMediaItemDto
   */
  isPlayable: boolean;
  /**
   * @type {string}
   * @memberof CreateMediaItemDto
   */
  summary: string;
  /**
   * @type {string}
   * @memberof CreateMediaItemDto
   */
  description: string;
  /**
   * @type {string}
   * @memberof CreateMediaItemDto
   */
  title: string;
  /**
   * @type {string}
   * @memberof CreateMediaItemDto
   */
  category: CreateMediaItemDtoCategoryEnum;
}

/**
 * @export
 * @enum {string}
 */
export enum CreateMediaItemDtoCategoryEnum {
  Strength = 'strength',
  Flexibility = 'flexibility',
  Endurance = 'endurance',
}
