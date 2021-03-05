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

import { Observable } from 'rxjs';
import { BaseAPI, HttpHeaders, throwIfNullOrUndefined, encodeURI, OperationOpts, RawAjaxResponse } from '../runtime';
import {
    CreateUserDto,
    UpdateUserDto,
} from '../models';

export interface UsersControllerCreateRequest {
    createUserDto: CreateUserDto;
}

export interface UsersControllerFindOneRequest {
    id: string;
}

export interface UsersControllerGetMediaRequest {
    id: string;
}

export interface UsersControllerGetPlaylistsRequest {
    id: string;
}

export interface UsersControllerGetShareItemsRequest {
    id: string;
}

export interface UsersControllerGetSharedMediaItemsRequest {
    id: string;
}

export interface UsersControllerGetSharedPlaylistsRequest {
    id: string;
}

export interface UsersControllerReadSharedItemRequest {
    id: string;
    shareId: string;
}

export interface UsersControllerRemoveRequest {
    id: string;
}

export interface UsersControllerSetRolesRequest {
    id: string;
}

export interface UsersControllerUpdateRequest {
    id: string;
    updateUserDto: UpdateUserDto;
}

/**
 * no description
 */
export class UsersApi extends BaseAPI {

    /**
     */
    usersControllerCreate({ createUserDto }: UsersControllerCreateRequest): Observable<void>
    usersControllerCreate({ createUserDto }: UsersControllerCreateRequest, opts?: OperationOpts): Observable<void | RawAjaxResponse<void>>
    usersControllerCreate({ createUserDto }: UsersControllerCreateRequest, opts?: OperationOpts): Observable<void | RawAjaxResponse<void>> {
        throwIfNullOrUndefined(createUserDto, 'createUserDto', 'usersControllerCreate');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
        };

        return this.request<void>({
            url: '/api/users',
            method: 'POST',
            headers,
            body: createUserDto,
        }, opts?.responseOpts);
    };

    /**
     */
    usersControllerFindAll(): Observable<void>
    usersControllerFindAll(opts?: OperationOpts): Observable<void | RawAjaxResponse<void>>
    usersControllerFindAll(opts?: OperationOpts): Observable<void | RawAjaxResponse<void>> {
        return this.request<void>({
            url: '/api/users',
            method: 'GET',
        }, opts?.responseOpts);
    };

    /**
     */
    usersControllerFindOne({ id }: UsersControllerFindOneRequest): Observable<void>
    usersControllerFindOne({ id }: UsersControllerFindOneRequest, opts?: OperationOpts): Observable<void | RawAjaxResponse<void>>
    usersControllerFindOne({ id }: UsersControllerFindOneRequest, opts?: OperationOpts): Observable<void | RawAjaxResponse<void>> {
        throwIfNullOrUndefined(id, 'id', 'usersControllerFindOne');

        return this.request<void>({
            url: '/api/users/{id}'.replace('{id}', encodeURI(id)),
            method: 'GET',
        }, opts?.responseOpts);
    };

    /**
     */
    usersControllerGetMedia({ id }: UsersControllerGetMediaRequest): Observable<void>
    usersControllerGetMedia({ id }: UsersControllerGetMediaRequest, opts?: OperationOpts): Observable<void | RawAjaxResponse<void>>
    usersControllerGetMedia({ id }: UsersControllerGetMediaRequest, opts?: OperationOpts): Observable<void | RawAjaxResponse<void>> {
        throwIfNullOrUndefined(id, 'id', 'usersControllerGetMedia');

        return this.request<void>({
            url: '/api/users/{id}/media-items'.replace('{id}', encodeURI(id)),
            method: 'GET',
        }, opts?.responseOpts);
    };

    /**
     */
    usersControllerGetPlaylists({ id }: UsersControllerGetPlaylistsRequest): Observable<void>
    usersControllerGetPlaylists({ id }: UsersControllerGetPlaylistsRequest, opts?: OperationOpts): Observable<void | RawAjaxResponse<void>>
    usersControllerGetPlaylists({ id }: UsersControllerGetPlaylistsRequest, opts?: OperationOpts): Observable<void | RawAjaxResponse<void>> {
        throwIfNullOrUndefined(id, 'id', 'usersControllerGetPlaylists');

        return this.request<void>({
            url: '/api/users/{id}/playlists'.replace('{id}', encodeURI(id)),
            method: 'GET',
        }, opts?.responseOpts);
    };

    /**
     */
    usersControllerGetShareItems({ id }: UsersControllerGetShareItemsRequest): Observable<void>
    usersControllerGetShareItems({ id }: UsersControllerGetShareItemsRequest, opts?: OperationOpts): Observable<void | RawAjaxResponse<void>>
    usersControllerGetShareItems({ id }: UsersControllerGetShareItemsRequest, opts?: OperationOpts): Observable<void | RawAjaxResponse<void>> {
        throwIfNullOrUndefined(id, 'id', 'usersControllerGetShareItems');

        return this.request<void>({
            url: '/api/users/{id}/share-items'.replace('{id}', encodeURI(id)),
            method: 'GET',
        }, opts?.responseOpts);
    };

    /**
     */
    usersControllerGetSharedMediaItems({ id }: UsersControllerGetSharedMediaItemsRequest): Observable<void>
    usersControllerGetSharedMediaItems({ id }: UsersControllerGetSharedMediaItemsRequest, opts?: OperationOpts): Observable<void | RawAjaxResponse<void>>
    usersControllerGetSharedMediaItems({ id }: UsersControllerGetSharedMediaItemsRequest, opts?: OperationOpts): Observable<void | RawAjaxResponse<void>> {
        throwIfNullOrUndefined(id, 'id', 'usersControllerGetSharedMediaItems');

        return this.request<void>({
            url: '/api/users/{id}/shared-media-items'.replace('{id}', encodeURI(id)),
            method: 'GET',
        }, opts?.responseOpts);
    };

    /**
     */
    usersControllerGetSharedPlaylists({ id }: UsersControllerGetSharedPlaylistsRequest): Observable<void>
    usersControllerGetSharedPlaylists({ id }: UsersControllerGetSharedPlaylistsRequest, opts?: OperationOpts): Observable<void | RawAjaxResponse<void>>
    usersControllerGetSharedPlaylists({ id }: UsersControllerGetSharedPlaylistsRequest, opts?: OperationOpts): Observable<void | RawAjaxResponse<void>> {
        throwIfNullOrUndefined(id, 'id', 'usersControllerGetSharedPlaylists');

        return this.request<void>({
            url: '/api/users/{id}/shared-playlists'.replace('{id}', encodeURI(id)),
            method: 'GET',
        }, opts?.responseOpts);
    };

    /**
     */
    usersControllerLogin(): Observable<void>
    usersControllerLogin(opts?: OperationOpts): Observable<void | RawAjaxResponse<void>>
    usersControllerLogin(opts?: OperationOpts): Observable<void | RawAjaxResponse<void>> {
        return this.request<void>({
            url: '/api/users/login',
            method: 'POST',
        }, opts?.responseOpts);
    };

    /**
     */
    usersControllerLogout(): Observable<void>
    usersControllerLogout(opts?: OperationOpts): Observable<void | RawAjaxResponse<void>>
    usersControllerLogout(opts?: OperationOpts): Observable<void | RawAjaxResponse<void>> {
        return this.request<void>({
            url: '/api/users/logout',
            method: 'POST',
        }, opts?.responseOpts);
    };

    /**
     */
    usersControllerReadSharedItem({ id, shareId }: UsersControllerReadSharedItemRequest): Observable<void>
    usersControllerReadSharedItem({ id, shareId }: UsersControllerReadSharedItemRequest, opts?: OperationOpts): Observable<void | RawAjaxResponse<void>>
    usersControllerReadSharedItem({ id, shareId }: UsersControllerReadSharedItemRequest, opts?: OperationOpts): Observable<void | RawAjaxResponse<void>> {
        throwIfNullOrUndefined(id, 'id', 'usersControllerReadSharedItem');
        throwIfNullOrUndefined(shareId, 'shareId', 'usersControllerReadSharedItem');

        return this.request<void>({
            url: '/api/users/{id}/shared-items/{shareId}'.replace('{id}', encodeURI(id)).replace('{shareId}', encodeURI(shareId)),
            method: 'POST',
        }, opts?.responseOpts);
    };

    /**
     */
    usersControllerRemove({ id }: UsersControllerRemoveRequest): Observable<void>
    usersControllerRemove({ id }: UsersControllerRemoveRequest, opts?: OperationOpts): Observable<void | RawAjaxResponse<void>>
    usersControllerRemove({ id }: UsersControllerRemoveRequest, opts?: OperationOpts): Observable<void | RawAjaxResponse<void>> {
        throwIfNullOrUndefined(id, 'id', 'usersControllerRemove');

        return this.request<void>({
            url: '/api/users/{id}'.replace('{id}', encodeURI(id)),
            method: 'DELETE',
        }, opts?.responseOpts);
    };

    /**
     */
    usersControllerSetRoles({ id }: UsersControllerSetRolesRequest): Observable<void>
    usersControllerSetRoles({ id }: UsersControllerSetRolesRequest, opts?: OperationOpts): Observable<void | RawAjaxResponse<void>>
    usersControllerSetRoles({ id }: UsersControllerSetRolesRequest, opts?: OperationOpts): Observable<void | RawAjaxResponse<void>> {
        throwIfNullOrUndefined(id, 'id', 'usersControllerSetRoles');

        return this.request<void>({
            url: '/api/users/{id}/roles'.replace('{id}', encodeURI(id)),
            method: 'PUT',
        }, opts?.responseOpts);
    };

    /**
     */
    usersControllerUpdate({ id, updateUserDto }: UsersControllerUpdateRequest): Observable<void>
    usersControllerUpdate({ id, updateUserDto }: UsersControllerUpdateRequest, opts?: OperationOpts): Observable<void | RawAjaxResponse<void>>
    usersControllerUpdate({ id, updateUserDto }: UsersControllerUpdateRequest, opts?: OperationOpts): Observable<void | RawAjaxResponse<void>> {
        throwIfNullOrUndefined(id, 'id', 'usersControllerUpdate');
        throwIfNullOrUndefined(updateUserDto, 'updateUserDto', 'usersControllerUpdate');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
        };

        return this.request<void>({
            url: '/api/users/{id}'.replace('{id}', encodeURI(id)),
            method: 'PUT',
            headers,
            body: updateUserDto,
        }, opts?.responseOpts);
    };

}
