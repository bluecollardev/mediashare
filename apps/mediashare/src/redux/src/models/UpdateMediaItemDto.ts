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
/**
 *
 * @export
 * @interface UpdateMediaItemDto
 */
export interface UpdateMediaItemDto {
  /**
   *
   * @type {string}
   * @memberof UpdateMediaItemDto
   */
  _id?: string;
  /**
   *
   * @type {Date}
   * @memberof UpdateMediaItemDto
   */
  readonly createdAt?: Date;
  /**
   *
   * @type {Date}
   * @memberof UpdateMediaItemDto
   */
  readonly updatedDate?: Date;
  /**
   * Created by type is generated by the @CreateDto decorator
   * @type {string}
   * @memberof UpdateMediaItemDto
   */
  createdBy?: string;
  /**
   * Created by type is generated by the @CreateDto decorator
   * @type {string}
   * @memberof UpdateMediaItemDto
   */
  userId?: string;
  /**
   *
   * @type {boolean}
   * @memberof UpdateMediaItemDto
   */
  isPlayable?: boolean;
  /**
   *
   * @type {string}
   * @memberof UpdateMediaItemDto
   */
  summary?: string;
  /**
   *
   * @type {string}
   * @memberof UpdateMediaItemDto
   */
  description?: string;
  /**
   *
   * @type {string}
   * @memberof UpdateMediaItemDto
   */
  title?: string;
  /**
   *
   * @type {string}
   * @memberof UpdateMediaItemDto
   */
  displayFileName?: string;
  /**
   *
   * @type {string}
   * @memberof UpdateMediaItemDto
   */
  thumbnail?: string;
  /**
   *
   * @type {string}
   * @memberof UpdateMediaItemDto
   */
  uri?: string;
  /**
   *
   * @type {string}
   * @memberof UpdateMediaItemDto
   */
  category?: UpdateMediaItemDtoCategoryEnum;
}

export function UpdateMediaItemDtoFromJSON(json: any): UpdateMediaItemDto {
  return {
    _id: !exists(json, '_id') ? undefined : json['_id'],
    createdAt: !exists(json, 'createdAt') ? undefined : new Date(json['createdAt']),
    updatedDate: !exists(json, 'updatedDate') ? undefined : new Date(json['updatedDate']),
    createdBy: !exists(json, 'createdBy') ? undefined : json['createdBy'],
    userId: !exists(json, 'userId') ? undefined : json['userId'],
    isPlayable: !exists(json, 'isPlayable') ? undefined : json['isPlayable'],
    summary: !exists(json, 'summary') ? undefined : json['summary'],
    description: !exists(json, 'description') ? undefined : json['description'],
    title: !exists(json, 'title') ? undefined : json['title'],
    displayFileName: !exists(json, 'displayFileName') ? undefined : json['displayFileName'],
    thumbnail: !exists(json, 'thumbnail') ? undefined : json['thumbnail'],
    uri: !exists(json, 'uri') ? undefined : json['uri'],
    category: !exists(json, 'category') ? undefined : json['category'],
  };
}

export function UpdateMediaItemDtoToJSON(value?: UpdateMediaItemDto): any {
  if (value === undefined) {
    return undefined;
  }
  return {
    _id: value._id,
    createdBy: value.createdBy,
    userId: value.userId,
    isPlayable: value.isPlayable,
    summary: value.summary,
    description: value.description,
    title: value.title,
    displayFileName: value.displayFileName,
    thumbnail: value.thumbnail,
    uri: value.uri,
    category: value.category,
  };
}

/**
 * @export
 * @enum {string}
 */
export enum UpdateMediaItemDtoCategoryEnum {
  Strength = 'strength',
  Flexibility = 'flexibility',
  Endurance = 'endurance',
}
