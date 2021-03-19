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
 * @interface UpdatePlaylistDto
 */
export interface UpdatePlaylistDto {
  /**
   *
   * @type {string}
   * @memberof UpdatePlaylistDto
   */
  title: string;
  /**
   *
   * @type {string}
   * @memberof UpdatePlaylistDto
   */
  category: UpdatePlaylistDtoCategoryEnum;
  /**
   *
   * @type {Array<string>}
   * @memberof UpdatePlaylistDto
   */
  items?: Array<string>;
}

export function UpdatePlaylistDtoFromJSON(json: any): UpdatePlaylistDto {
  return {
    title: json['title'],
    category: json['category'],
    items: !exists(json, 'items') ? undefined : json['items'],
  };
}

export function UpdatePlaylistDtoToJSON(value?: UpdatePlaylistDto): any {
  if (value === undefined) {
    return undefined;
  }
  return {
    title: value.title,
    category: value.category,
    items: value.items,
  };
}

/**
 * @export
 * @enum {string}
 */
export enum UpdatePlaylistDtoCategoryEnum {
  Rehab = 'rehab',
  Builder = 'builder',
  Warmup = 'warmup',
}
