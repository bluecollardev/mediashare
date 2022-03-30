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
import { BaseAPI, HttpHeaders, throwIfNullOrUndefined, encodeURI, OperationOpts, RawAjaxResponse } from '../runtime';
import { ViewItem } from '../models';

export interface ViewsControllerCreateMediaViewRequest {
  mediaId: string;
}

export interface ViewsControllerCreatePlaylistViewRequest {
  playlistId: string;
}

/**
 * no description
 */
export class ViewsApi extends BaseAPI {
  /**
   */
  viewsControllerCreateMediaView({ mediaId }: ViewsControllerCreateMediaViewRequest): Observable<ViewItem>;
  viewsControllerCreateMediaView({ mediaId }: ViewsControllerCreateMediaViewRequest, opts?: OperationOpts): Observable<RawAjaxResponse<ViewItem>>;
  viewsControllerCreateMediaView({ mediaId }: ViewsControllerCreateMediaViewRequest, opts?: OperationOpts): Observable<ViewItem | RawAjaxResponse<ViewItem>> {
    throwIfNullOrUndefined(mediaId, 'mediaId', 'viewsControllerCreateMediaView');

    const headers: HttpHeaders = {
      ...(this.configuration.username != null && this.configuration.password != null
        ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` }
        : undefined),
    };

    return this.request<ViewItem>(
      {
        url: '/api/views/mediaItem/{mediaId}'.replace('{mediaId}', encodeURI(mediaId)),
        method: 'POST',
        headers,
      },
      opts?.responseOpts
    );
  }

  /**
   */
  viewsControllerCreatePlaylistView({ playlistId }: ViewsControllerCreatePlaylistViewRequest): Observable<ViewItem>;
  viewsControllerCreatePlaylistView({ playlistId }: ViewsControllerCreatePlaylistViewRequest, opts?: OperationOpts): Observable<RawAjaxResponse<ViewItem>>;
  viewsControllerCreatePlaylistView(
    { playlistId }: ViewsControllerCreatePlaylistViewRequest,
    opts?: OperationOpts
  ): Observable<ViewItem | RawAjaxResponse<ViewItem>> {
    throwIfNullOrUndefined(playlistId, 'playlistId', 'viewsControllerCreatePlaylistView');

    const headers: HttpHeaders = {
      ...(this.configuration.username != null && this.configuration.password != null
        ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` }
        : undefined),
    };

    return this.request<ViewItem>(
      {
        url: '/api/views/playlist/{playlistId}'.replace('{playlistId}', encodeURI(playlistId)),
        method: 'POST',
        headers,
      },
      opts?.responseOpts
    );
  }
}
