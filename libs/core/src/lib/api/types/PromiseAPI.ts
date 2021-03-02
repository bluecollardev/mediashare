import { ResponseContext, RequestContext, HttpFile } from '../http/http';
import * as models from '../models/all';
import { Configuration} from '../configuration'

import { CreateMediaItemDto } from '../models/CreateMediaItemDto';
import { CreatePlaylistDto } from '../models/CreatePlaylistDto';
import { CreateUserDto } from '../models/CreateUserDto';
import { UpdatePlaylistDto } from '../models/UpdatePlaylistDto';
import { UpdateUserDto } from '../models/UpdateUserDto';
import { ObservableDefaultApi } from './ObservableAPI';


import { DefaultApiRequestFactory, DefaultApiResponseProcessor} from "../apis/DefaultApi";
export class PromiseDefaultApi {
    private api: ObservableDefaultApi

    public constructor(
        configuration: Configuration,
        requestFactory?: DefaultApiRequestFactory,
        responseProcessor?: DefaultApiResponseProcessor
    ) {
        this.api = new ObservableDefaultApi(configuration, requestFactory, responseProcessor);
    }

    /**
     */
    public appControllerGetData(options?: Configuration): Promise<void> {
    	const result = this.api.appControllerGetData(options);
        return result.toPromise();
    }
	
    /**
     * @param body 
     */
    public profileControllerCreate(body: any, options?: Configuration): Promise<void> {
    	const result = this.api.profileControllerCreate(body, options);
        return result.toPromise();
    }
	
    /**
     */
    public profileControllerFindAll(options?: Configuration): Promise<void> {
    	const result = this.api.profileControllerFindAll(options);
        return result.toPromise();
    }
	
    /**
     * @param id 
     */
    public profileControllerFindOne(id: string, options?: Configuration): Promise<void> {
    	const result = this.api.profileControllerFindOne(id, options);
        return result.toPromise();
    }
	
    /**
     * @param id 
     */
    public profileControllerRemove(id: string, options?: Configuration): Promise<void> {
    	const result = this.api.profileControllerRemove(id, options);
        return result.toPromise();
    }
	
    /**
     * @param id 
     * @param body 
     */
    public profileControllerUpdate(id: string, body: any, options?: Configuration): Promise<void> {
    	const result = this.api.profileControllerUpdate(id, body, options);
        return result.toPromise();
    }
	

}



import { ObservableMediaItemsApi } from './ObservableAPI';


import { MediaItemsApiRequestFactory, MediaItemsApiResponseProcessor} from "../apis/MediaItemsApi";
export class PromiseMediaItemsApi {
    private api: ObservableMediaItemsApi

    public constructor(
        configuration: Configuration,
        requestFactory?: MediaItemsApiRequestFactory,
        responseProcessor?: MediaItemsApiResponseProcessor
    ) {
        this.api = new ObservableMediaItemsApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param createMediaItemDto 
     */
    public mediaItemControllerCreate(createMediaItemDto: CreateMediaItemDto, options?: Configuration): Promise<void> {
    	const result = this.api.mediaItemControllerCreate(createMediaItemDto, options);
        return result.toPromise();
    }
	
    /**
     */
    public mediaItemControllerFindAll(options?: Configuration): Promise<void> {
    	const result = this.api.mediaItemControllerFindAll(options);
        return result.toPromise();
    }
	
    /**
     * @param id 
     */
    public mediaItemControllerFindOne(id: string, options?: Configuration): Promise<void> {
    	const result = this.api.mediaItemControllerFindOne(id, options);
        return result.toPromise();
    }
	
    /**
     * @param id 
     */
    public mediaItemControllerRemove(id: string, options?: Configuration): Promise<void> {
    	const result = this.api.mediaItemControllerRemove(id, options);
        return result.toPromise();
    }
	
    /**
     * @param id 
     * @param userId 
     */
    public mediaItemControllerShare(id: string, userId: string, options?: Configuration): Promise<void> {
    	const result = this.api.mediaItemControllerShare(id, userId, options);
        return result.toPromise();
    }
	
    /**
     * @param id 
     * @param body 
     */
    public mediaItemControllerUpdate(id: string, body: any, options?: Configuration): Promise<void> {
    	const result = this.api.mediaItemControllerUpdate(id, body, options);
        return result.toPromise();
    }
	

}



import { ObservablePlaylistsApi } from './ObservableAPI';


import { PlaylistsApiRequestFactory, PlaylistsApiResponseProcessor} from "../apis/PlaylistsApi";
export class PromisePlaylistsApi {
    private api: ObservablePlaylistsApi

    public constructor(
        configuration: Configuration,
        requestFactory?: PlaylistsApiRequestFactory,
        responseProcessor?: PlaylistsApiResponseProcessor
    ) {
        this.api = new ObservablePlaylistsApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param createPlaylistDto 
     */
    public playlistControllerCreate(createPlaylistDto: CreatePlaylistDto, options?: Configuration): Promise<void> {
    	const result = this.api.playlistControllerCreate(createPlaylistDto, options);
        return result.toPromise();
    }
	
    /**
     */
    public playlistControllerFindAll(options?: Configuration): Promise<void> {
    	const result = this.api.playlistControllerFindAll(options);
        return result.toPromise();
    }
	
    /**
     * @param id 
     */
    public playlistControllerFindOne(id: string, options?: Configuration): Promise<void> {
    	const result = this.api.playlistControllerFindOne(id, options);
        return result.toPromise();
    }
	
    /**
     * @param id 
     */
    public playlistControllerRemove(id: string, options?: Configuration): Promise<void> {
    	const result = this.api.playlistControllerRemove(id, options);
        return result.toPromise();
    }
	
    /**
     * @param id 
     * @param userId 
     */
    public playlistControllerShare(id: string, userId: string, options?: Configuration): Promise<void> {
    	const result = this.api.playlistControllerShare(id, userId, options);
        return result.toPromise();
    }
	
    /**
     * @param id 
     * @param updatePlaylistDto 
     */
    public playlistControllerUpdate(id: string, updatePlaylistDto: UpdatePlaylistDto, options?: Configuration): Promise<void> {
    	const result = this.api.playlistControllerUpdate(id, updatePlaylistDto, options);
        return result.toPromise();
    }
	

}



import { ObservableUsersApi } from './ObservableAPI';


import { UsersApiRequestFactory, UsersApiResponseProcessor} from "../apis/UsersApi";
export class PromiseUsersApi {
    private api: ObservableUsersApi

    public constructor(
        configuration: Configuration,
        requestFactory?: UsersApiRequestFactory,
        responseProcessor?: UsersApiResponseProcessor
    ) {
        this.api = new ObservableUsersApi(configuration, requestFactory, responseProcessor);
    }

    /**
     */
    public userControllerAuthorize(options?: Configuration): Promise<void> {
    	const result = this.api.userControllerAuthorize(options);
        return result.toPromise();
    }
	
    /**
     * @param createUserDto 
     */
    public userControllerCreate(createUserDto: CreateUserDto, options?: Configuration): Promise<void> {
    	const result = this.api.userControllerCreate(createUserDto, options);
        return result.toPromise();
    }
	
    /**
     */
    public userControllerFindAll(options?: Configuration): Promise<void> {
    	const result = this.api.userControllerFindAll(options);
        return result.toPromise();
    }
	
    /**
     * @param id 
     */
    public userControllerFindOne(id: string, options?: Configuration): Promise<void> {
    	const result = this.api.userControllerFindOne(id, options);
        return result.toPromise();
    }
	
    /**
     * @param id 
     */
    public userControllerGetMedia(id: string, options?: Configuration): Promise<void> {
    	const result = this.api.userControllerGetMedia(id, options);
        return result.toPromise();
    }
	
    /**
     * @param id 
     */
    public userControllerGetPlaylists(id: string, options?: Configuration): Promise<void> {
    	const result = this.api.userControllerGetPlaylists(id, options);
        return result.toPromise();
    }
	
    /**
     * @param id 
     */
    public userControllerGetShareItems(id: string, options?: Configuration): Promise<void> {
    	const result = this.api.userControllerGetShareItems(id, options);
        return result.toPromise();
    }
	
    /**
     * @param id 
     */
    public userControllerGetSharedMediaItems(id: string, options?: Configuration): Promise<void> {
    	const result = this.api.userControllerGetSharedMediaItems(id, options);
        return result.toPromise();
    }
	
    /**
     * @param id 
     */
    public userControllerGetSharedPlaylists(id: string, options?: Configuration): Promise<void> {
    	const result = this.api.userControllerGetSharedPlaylists(id, options);
        return result.toPromise();
    }
	
    /**
     */
    public userControllerLogin(options?: Configuration): Promise<void> {
    	const result = this.api.userControllerLogin(options);
        return result.toPromise();
    }
	
    /**
     * @param id 
     * @param shareId 
     */
    public userControllerReadSharedItem(id: string, shareId: string, options?: Configuration): Promise<void> {
    	const result = this.api.userControllerReadSharedItem(id, shareId, options);
        return result.toPromise();
    }
	
    /**
     * @param id 
     */
    public userControllerRemove(id: string, options?: Configuration): Promise<void> {
    	const result = this.api.userControllerRemove(id, options);
        return result.toPromise();
    }
	
    /**
     * @param id 
     * @param updateUserDto 
     */
    public userControllerUpdate(id: string, updateUserDto: UpdateUserDto, options?: Configuration): Promise<void> {
    	const result = this.api.userControllerUpdate(id, updateUserDto, options);
        return result.toPromise();
    }
	

}



