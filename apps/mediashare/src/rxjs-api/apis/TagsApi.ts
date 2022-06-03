// tslint:disable
/**
 * Mediashare
 * Mediashare API
 *
 * The version of the OpenAPI document: 0.1.5
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { Observable } from 'rxjs';
import { BaseAPI, HttpHeaders, throwIfNullOrUndefined, encodeURI, OperationOpts, RawAjaxResponse } from '../runtime';
import { Tag } from '../models';

export interface TagsControllerFindOneRequest {
  tagId: string;
}

export interface TagsControllerRemoveRequest {
  tagId: string;
}

/**
 * no description
 */
export class TagsApi extends BaseAPI {
  /**
   */
  tagsControllerFindAll(): Observable<Array<Tag>>;
  tagsControllerFindAll(opts?: OperationOpts): Observable<RawAjaxResponse<Array<Tag>>>;
  tagsControllerFindAll(opts?: OperationOpts): Observable<Array<Tag> | RawAjaxResponse<Array<Tag>>> {
    const headers: HttpHeaders = {
      ...(this.configuration.username != null && this.configuration.password != null
        ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` }
        : undefined),
    };

    return this.request<Array<Tag>>(
      {
        url: '/api/tags',
        method: 'GET',
        headers,
      },
      opts?.responseOpts
    );
  }

  /**
   */
  tagsControllerFindOne({ tagId }: TagsControllerFindOneRequest): Observable<Tag>;
  tagsControllerFindOne({ tagId }: TagsControllerFindOneRequest, opts?: OperationOpts): Observable<RawAjaxResponse<Tag>>;
  tagsControllerFindOne({ tagId }: TagsControllerFindOneRequest, opts?: OperationOpts): Observable<Tag | RawAjaxResponse<Tag>> {
    throwIfNullOrUndefined(tagId, 'tagId', 'tagsControllerFindOne');

    const headers: HttpHeaders = {
      ...(this.configuration.username != null && this.configuration.password != null
        ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` }
        : undefined),
    };

    return this.request<Tag>(
      {
        url: '/api/tags/{tagId}'.replace('{tagId}', encodeURI(tagId)),
        method: 'GET',
        headers,
      },
      opts?.responseOpts
    );
  }

  /**
   */
  tagsControllerRemove({ tagId }: TagsControllerRemoveRequest): Observable<Tag>;
  tagsControllerRemove({ tagId }: TagsControllerRemoveRequest, opts?: OperationOpts): Observable<RawAjaxResponse<Tag>>;
  tagsControllerRemove({ tagId }: TagsControllerRemoveRequest, opts?: OperationOpts): Observable<Tag | RawAjaxResponse<Tag>> {
    throwIfNullOrUndefined(tagId, 'tagId', 'tagsControllerRemove');

    const headers: HttpHeaders = {
      ...(this.configuration.username != null && this.configuration.password != null
        ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` }
        : undefined),
    };

    return this.request<Tag>(
      {
        url: '/api/tags/{tagId}'.replace('{tagId}', encodeURI(tagId)),
        method: 'DELETE',
        headers,
      },
      opts?.responseOpts
    );
  }
}
