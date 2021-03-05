// tslint:disable
/**
 * Media Share API
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
 * @interface UpdatePlaylistDto
 */
export interface UpdatePlaylistDto {
    /**
     * @type {Array<string>}
     * @memberof UpdatePlaylistDto
     */
    items?: Array<string>;
    /**
     * @type {string}
     * @memberof UpdatePlaylistDto
     */
    userId?: string;
    /**
     * @type {string}
     * @memberof UpdatePlaylistDto
     */
    title?: string;
    /**
     * @type {string}
     * @memberof UpdatePlaylistDto
     */
    category?: UpdatePlaylistDtoCategoryEnum;
}

/**
 * @export
 * @enum {string}
 */
export enum UpdatePlaylistDtoCategoryEnum {
    Rehab = 'rehab',
    Builder = 'builder',
    Warmup = 'warmup'
}

