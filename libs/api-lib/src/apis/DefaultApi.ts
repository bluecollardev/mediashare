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

import { Observable } from 'rxjs';
import { BaseAPI, OperationOpts, RawAjaxResponse } from '../runtime';

/**
 * no description
 */
export class DefaultApi extends BaseAPI {
  /**
   */
  appControllerGetData(): Observable<void>;
  appControllerGetData(opts?: OperationOpts): Observable<void | RawAjaxResponse<void>>;
  appControllerGetData(opts?: OperationOpts): Observable<void | RawAjaxResponse<void>> {
    return this.request<void>(
      {
        url: '/api/api',
        method: 'GET',
      },
      opts?.responseOpts
    );
  }
}
