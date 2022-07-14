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
import { BaseAPI, HttpHeaders, HttpQuery, throwIfNullOrUndefined, encodeURI, OperationOpts, RawAjaxResponse } from '../runtime';
import {
    CreatePlaylistDto,
    CreatePlaylistResponseDto,
    Playlist,
    PlaylistResponseDto,
    ShareItem,
    UpdatePlaylistDto,
} from '../models';

export interface PlaylistControllerCreateRequest {
    createPlaylistDto: CreatePlaylistDto;
}

export interface PlaylistControllerFindAllRequest {
    text?: string;
    tags?: Array<string>;
}

export interface PlaylistControllerFindOneRequest {
    playlistId: string;
}

export interface PlaylistControllerRemoveRequest {
    playlistId: string;
}

export interface PlaylistControllerShareRequest {
    playlistId: string;
    userId: string;
}

export interface PlaylistControllerUpdateRequest {
    playlistId: string;
    updatePlaylistDto: UpdatePlaylistDto;
}

/**
 * no description
 */
export class PlaylistsApi extends BaseAPI {

    /**
     */
    playlistControllerCreate({ createPlaylistDto }: PlaylistControllerCreateRequest): Observable<CreatePlaylistResponseDto>
    playlistControllerCreate({ createPlaylistDto }: PlaylistControllerCreateRequest, opts?: OperationOpts): Observable<RawAjaxResponse<CreatePlaylistResponseDto>>
    playlistControllerCreate({ createPlaylistDto }: PlaylistControllerCreateRequest, opts?: OperationOpts): Observable<CreatePlaylistResponseDto | RawAjaxResponse<CreatePlaylistResponseDto>> {
        throwIfNullOrUndefined(createPlaylistDto, 'createPlaylistDto', 'playlistControllerCreate');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
        };

        return this.request<CreatePlaylistResponseDto>({
            url: '/api/playlists',
            method: 'POST',
            headers,
            body: createPlaylistDto,
        }, opts?.responseOpts);
    };

    /**
     */
    playlistControllerFindAll({ text, tags }: PlaylistControllerFindAllRequest): Observable<Array<PlaylistResponseDto>>
    playlistControllerFindAll({ text, tags }: PlaylistControllerFindAllRequest, opts?: OperationOpts): Observable<RawAjaxResponse<Array<PlaylistResponseDto>>>
    playlistControllerFindAll({ text, tags }: PlaylistControllerFindAllRequest, opts?: OperationOpts): Observable<Array<PlaylistResponseDto> | RawAjaxResponse<Array<PlaylistResponseDto>>> {

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
        };

        const query: HttpQuery = {};

        if (text != null) { query['text'] = text; }
        if (tags != null) { query['tags'] = tags; }

        return this.request<Array<PlaylistResponseDto>>({
            url: '/api/playlists',
            method: 'GET',
            headers,
            query,
        }, opts?.responseOpts);
    };

    /**
     */
    playlistControllerFindOne({ playlistId }: PlaylistControllerFindOneRequest): Observable<PlaylistResponseDto>
    playlistControllerFindOne({ playlistId }: PlaylistControllerFindOneRequest, opts?: OperationOpts): Observable<RawAjaxResponse<PlaylistResponseDto>>
    playlistControllerFindOne({ playlistId }: PlaylistControllerFindOneRequest, opts?: OperationOpts): Observable<PlaylistResponseDto | RawAjaxResponse<PlaylistResponseDto>> {
        throwIfNullOrUndefined(playlistId, 'playlistId', 'playlistControllerFindOne');

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
        };

        return this.request<PlaylistResponseDto>({
            url: '/api/playlists/{playlistId}'.replace('{playlistId}', encodeURI(playlistId)),
            method: 'GET',
            headers,
        }, opts?.responseOpts);
    };

    /**
     */
    playlistControllerFindPopular(): Observable<Array<PlaylistResponseDto>>
    playlistControllerFindPopular(opts?: OperationOpts): Observable<RawAjaxResponse<Array<PlaylistResponseDto>>>
    playlistControllerFindPopular(opts?: OperationOpts): Observable<Array<PlaylistResponseDto> | RawAjaxResponse<Array<PlaylistResponseDto>>> {
        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
        };

        return this.request<Array<PlaylistResponseDto>>({
            url: '/api/playlists/popular',
            method: 'GET',
            headers,
        }, opts?.responseOpts);
    };

    /**
     */
    playlistControllerGetCategories(): Observable<void>
    playlistControllerGetCategories(opts?: OperationOpts): Observable<void | RawAjaxResponse<void>>
    playlistControllerGetCategories(opts?: OperationOpts): Observable<void | RawAjaxResponse<void>> {
        return this.request<void>({
            url: '/api/playlists/categories',
            method: 'GET',
        }, opts?.responseOpts);
    };

    /**
     */
    playlistControllerRemove({ playlistId }: PlaylistControllerRemoveRequest): Observable<void>
    playlistControllerRemove({ playlistId }: PlaylistControllerRemoveRequest, opts?: OperationOpts): Observable<void | RawAjaxResponse<void>>
    playlistControllerRemove({ playlistId }: PlaylistControllerRemoveRequest, opts?: OperationOpts): Observable<void | RawAjaxResponse<void>> {
        throwIfNullOrUndefined(playlistId, 'playlistId', 'playlistControllerRemove');

        return this.request<void>({
            url: '/api/playlists/{playlistId}'.replace('{playlistId}', encodeURI(playlistId)),
            method: 'DELETE',
        }, opts?.responseOpts);
    };

    /**
     */
    playlistControllerShare({ playlistId, userId }: PlaylistControllerShareRequest): Observable<Array<ShareItem>>
    playlistControllerShare({ playlistId, userId }: PlaylistControllerShareRequest, opts?: OperationOpts): Observable<RawAjaxResponse<Array<ShareItem>>>
    playlistControllerShare({ playlistId, userId }: PlaylistControllerShareRequest, opts?: OperationOpts): Observable<Array<ShareItem> | RawAjaxResponse<Array<ShareItem>>> {
        throwIfNullOrUndefined(playlistId, 'playlistId', 'playlistControllerShare');
        throwIfNullOrUndefined(userId, 'userId', 'playlistControllerShare');

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
        };

        return this.request<Array<ShareItem>>({
            url: '/api/playlists/{playlistId}/share/{userId}'.replace('{playlistId}', encodeURI(playlistId)).replace('{userId}', encodeURI(userId)),
            method: 'POST',
            headers,
        }, opts?.responseOpts);
    };

    /**
     */
    playlistControllerUpdate({ playlistId, updatePlaylistDto }: PlaylistControllerUpdateRequest): Observable<Playlist>
    playlistControllerUpdate({ playlistId, updatePlaylistDto }: PlaylistControllerUpdateRequest, opts?: OperationOpts): Observable<RawAjaxResponse<Playlist>>
    playlistControllerUpdate({ playlistId, updatePlaylistDto }: PlaylistControllerUpdateRequest, opts?: OperationOpts): Observable<Playlist | RawAjaxResponse<Playlist>> {
        throwIfNullOrUndefined(playlistId, 'playlistId', 'playlistControllerUpdate');
        throwIfNullOrUndefined(updatePlaylistDto, 'updatePlaylistDto', 'playlistControllerUpdate');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
        };

        return this.request<Playlist>({
            url: '/api/playlists/{playlistId}'.replace('{playlistId}', encodeURI(playlistId)),
            method: 'PUT',
            headers,
            body: updatePlaylistDto,
        }, opts?.responseOpts);
    };

}
