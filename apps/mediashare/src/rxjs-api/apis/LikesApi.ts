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
import {
    Like,
} from '../models';

export interface LikesControllerCreateMediaViewRequest {
    mediaId: string;
}

export interface LikesControllerCreatePlaylistViewRequest {
    playlistId: string;
}

export interface LikesControllerRemoveRequest {
    likeId: string;
    mediaId: string;
}

/**
 * no description
 */
export class LikesApi extends BaseAPI {

    /**
     */
    likesControllerCreateMediaView({ mediaId }: LikesControllerCreateMediaViewRequest): Observable<Like>
    likesControllerCreateMediaView({ mediaId }: LikesControllerCreateMediaViewRequest, opts?: OperationOpts): Observable<RawAjaxResponse<Like>>
    likesControllerCreateMediaView({ mediaId }: LikesControllerCreateMediaViewRequest, opts?: OperationOpts): Observable<Like | RawAjaxResponse<Like>> {
        throwIfNullOrUndefined(mediaId, 'mediaId', 'likesControllerCreateMediaView');

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
        };

        return this.request<Like>({
            url: '/api/likes/mediaItem/{mediaId}'.replace('{mediaId}', encodeURI(mediaId)),
            method: 'POST',
            headers,
        }, opts?.responseOpts);
    };

    /**
     */
    likesControllerCreatePlaylistView({ playlistId }: LikesControllerCreatePlaylistViewRequest): Observable<Like>
    likesControllerCreatePlaylistView({ playlistId }: LikesControllerCreatePlaylistViewRequest, opts?: OperationOpts): Observable<RawAjaxResponse<Like>>
    likesControllerCreatePlaylistView({ playlistId }: LikesControllerCreatePlaylistViewRequest, opts?: OperationOpts): Observable<Like | RawAjaxResponse<Like>> {
        throwIfNullOrUndefined(playlistId, 'playlistId', 'likesControllerCreatePlaylistView');

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
        };

        return this.request<Like>({
            url: '/api/likes/playlist/{playlistId}'.replace('{playlistId}', encodeURI(playlistId)),
            method: 'POST',
            headers,
        }, opts?.responseOpts);
    };

    /**
     */
    likesControllerRemove({ likeId, mediaId }: LikesControllerRemoveRequest): Observable<Like>
    likesControllerRemove({ likeId, mediaId }: LikesControllerRemoveRequest, opts?: OperationOpts): Observable<RawAjaxResponse<Like>>
    likesControllerRemove({ likeId, mediaId }: LikesControllerRemoveRequest, opts?: OperationOpts): Observable<Like | RawAjaxResponse<Like>> {
        throwIfNullOrUndefined(likeId, 'likeId', 'likesControllerRemove');
        throwIfNullOrUndefined(mediaId, 'mediaId', 'likesControllerRemove');

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
        };

        return this.request<Like>({
            url: '/api/likes/{likeId}'.replace('{likeId}', encodeURI(likeId)).replace('{mediaId}', encodeURI(mediaId)),
            method: 'DELETE',
            headers,
        }, opts?.responseOpts);
    };

}
