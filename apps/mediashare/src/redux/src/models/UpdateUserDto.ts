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
 * @interface UpdateUserDto
 */
export interface UpdateUserDto  {
    /**
     * 
     * @type {string}
     * @memberof UpdateUserDto
     */
    _id?: string;
    /**
     * 
     * @type {Date}
     * @memberof UpdateUserDto
     */
    readonly createdAt?: Date;
    /**
     * 
     * @type {Date}
     * @memberof UpdateUserDto
     */
    readonly updatedDate?: Date;
    /**
     * Created by type is generated by the @CreateDto decorator
     * @type {string}
     * @memberof UpdateUserDto
     */
    createdBy?: string;
    /**
     * Created by type is generated by the @CreateDto decorator
     * @type {string}
     * @memberof UpdateUserDto
     */
    userId?: string;
}

export function UpdateUserDtoFromJSON(json: any): UpdateUserDto {
    return {
        '_id': !exists(json, '_id') ? undefined : json['_id'],
        'createdAt': !exists(json, 'createdAt') ? undefined : new Date(json['createdAt']),
        'updatedDate': !exists(json, 'updatedDate') ? undefined : new Date(json['updatedDate']),
        'createdBy': !exists(json, 'createdBy') ? undefined : json['createdBy'],
        'userId': !exists(json, 'userId') ? undefined : json['userId'],
    };
}

export function UpdateUserDtoToJSON(value?: UpdateUserDto): any {
    if (value === undefined) {
        return undefined;
    }
    return {
        '_id': value._id,
        'createdBy': value.createdBy,
        'userId': value.userId,
    };
}


