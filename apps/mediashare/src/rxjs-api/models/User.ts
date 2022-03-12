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
 * @interface User
 */
export interface User {
  /**
   * @type {string}
   * @memberof User
   */
  readonly _id: string;
  /**
   * @type {string}
   * @memberof User
   */
  readonly createdAt: string;
  /**
   * @type {string}
   * @memberof User
   */
  readonly updatedDate?: string;
  /**
   * Created by type is generated by the @CreateDto decorator
   * @type {string}
   * @memberof User
   */
  createdBy: string;
  /**
   * Created by type is generated by the @CreateDto decorator
   * @type {string}
   * @memberof User
   */
  userId: string;
}
