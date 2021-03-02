import { ResponseContext, RequestContext, HttpFile } from '../http/http';
import * as models from '../models/all';
import { Configuration} from '../configuration'

import { CreateMediaItemDto } from '../models/CreateMediaItemDto';
import { CreatePlaylistDto } from '../models/CreatePlaylistDto';
import { CreateUserDto } from '../models/CreateUserDto';
import { UpdatePlaylistDto } from '../models/UpdatePlaylistDto';
import { UpdateUserDto } from '../models/UpdateUserDto';

import { ObservableDefaultApi } from "./ObservableAPI";
import { DefaultApiRequestFactory, DefaultApiResponseProcessor} from "../apis/DefaultApi";

export interface DefaultApiAppControllerGetDataRequest {
}

export interface DefaultApiProfileControllerCreateRequest {
    /**
     * 
     * @type any
     * @memberof DefaultApiprofileControllerCreate
     */
    body: any
}

export interface DefaultApiProfileControllerFindAllRequest {
}

export interface DefaultApiProfileControllerFindOneRequest {
    /**
     * 
     * @type string
     * @memberof DefaultApiprofileControllerFindOne
     */
    id: string
}

export interface DefaultApiProfileControllerRemoveRequest {
    /**
     * 
     * @type string
     * @memberof DefaultApiprofileControllerRemove
     */
    id: string
}

export interface DefaultApiProfileControllerUpdateRequest {
    /**
     * 
     * @type string
     * @memberof DefaultApiprofileControllerUpdate
     */
    id: string
    /**
     * 
     * @type any
     * @memberof DefaultApiprofileControllerUpdate
     */
    body: any
}


export class ObjectDefaultApi {
    private api: ObservableDefaultApi

    public constructor(configuration: Configuration, requestFactory?: DefaultApiRequestFactory, responseProcessor?: DefaultApiResponseProcessor) {
        this.api = new ObservableDefaultApi(configuration, requestFactory, responseProcessor);
	}

    /**
     * @param param the request object
     */
    public appControllerGetData(param: DefaultApiAppControllerGetDataRequest, options?: Configuration): Promise<void> {
        return this.api.appControllerGetData( options).toPromise();
    }
	
    /**
     * @param param the request object
     */
    public profileControllerCreate(param: DefaultApiProfileControllerCreateRequest, options?: Configuration): Promise<void> {
        return this.api.profileControllerCreate(param.body,  options).toPromise();
    }
	
    /**
     * @param param the request object
     */
    public profileControllerFindAll(param: DefaultApiProfileControllerFindAllRequest, options?: Configuration): Promise<void> {
        return this.api.profileControllerFindAll( options).toPromise();
    }
	
    /**
     * @param param the request object
     */
    public profileControllerFindOne(param: DefaultApiProfileControllerFindOneRequest, options?: Configuration): Promise<void> {
        return this.api.profileControllerFindOne(param.id,  options).toPromise();
    }
	
    /**
     * @param param the request object
     */
    public profileControllerRemove(param: DefaultApiProfileControllerRemoveRequest, options?: Configuration): Promise<void> {
        return this.api.profileControllerRemove(param.id,  options).toPromise();
    }
	
    /**
     * @param param the request object
     */
    public profileControllerUpdate(param: DefaultApiProfileControllerUpdateRequest, options?: Configuration): Promise<void> {
        return this.api.profileControllerUpdate(param.id, param.body,  options).toPromise();
    }
	

}




import { ObservableMediaItemsApi } from "./ObservableAPI";
import { MediaItemsApiRequestFactory, MediaItemsApiResponseProcessor} from "../apis/MediaItemsApi";

export interface MediaItemsApiMediaItemControllerCreateRequest {
    /**
     * 
     * @type CreateMediaItemDto
     * @memberof MediaItemsApimediaItemControllerCreate
     */
    createMediaItemDto: CreateMediaItemDto
}

export interface MediaItemsApiMediaItemControllerFindAllRequest {
}

export interface MediaItemsApiMediaItemControllerFindOneRequest {
    /**
     * 
     * @type string
     * @memberof MediaItemsApimediaItemControllerFindOne
     */
    id: string
}

export interface MediaItemsApiMediaItemControllerRemoveRequest {
    /**
     * 
     * @type string
     * @memberof MediaItemsApimediaItemControllerRemove
     */
    id: string
}

export interface MediaItemsApiMediaItemControllerShareRequest {
    /**
     * 
     * @type string
     * @memberof MediaItemsApimediaItemControllerShare
     */
    id: string
    /**
     * 
     * @type string
     * @memberof MediaItemsApimediaItemControllerShare
     */
    userId: string
}

export interface MediaItemsApiMediaItemControllerUpdateRequest {
    /**
     * 
     * @type string
     * @memberof MediaItemsApimediaItemControllerUpdate
     */
    id: string
    /**
     * 
     * @type any
     * @memberof MediaItemsApimediaItemControllerUpdate
     */
    body: any
}


export class ObjectMediaItemsApi {
    private api: ObservableMediaItemsApi

    public constructor(configuration: Configuration, requestFactory?: MediaItemsApiRequestFactory, responseProcessor?: MediaItemsApiResponseProcessor) {
        this.api = new ObservableMediaItemsApi(configuration, requestFactory, responseProcessor);
	}

    /**
     * @param param the request object
     */
    public mediaItemControllerCreate(param: MediaItemsApiMediaItemControllerCreateRequest, options?: Configuration): Promise<void> {
        return this.api.mediaItemControllerCreate(param.createMediaItemDto,  options).toPromise();
    }
	
    /**
     * @param param the request object
     */
    public mediaItemControllerFindAll(param: MediaItemsApiMediaItemControllerFindAllRequest, options?: Configuration): Promise<void> {
        return this.api.mediaItemControllerFindAll( options).toPromise();
    }
	
    /**
     * @param param the request object
     */
    public mediaItemControllerFindOne(param: MediaItemsApiMediaItemControllerFindOneRequest, options?: Configuration): Promise<void> {
        return this.api.mediaItemControllerFindOne(param.id,  options).toPromise();
    }
	
    /**
     * @param param the request object
     */
    public mediaItemControllerRemove(param: MediaItemsApiMediaItemControllerRemoveRequest, options?: Configuration): Promise<void> {
        return this.api.mediaItemControllerRemove(param.id,  options).toPromise();
    }
	
    /**
     * @param param the request object
     */
    public mediaItemControllerShare(param: MediaItemsApiMediaItemControllerShareRequest, options?: Configuration): Promise<void> {
        return this.api.mediaItemControllerShare(param.id, param.userId,  options).toPromise();
    }
	
    /**
     * @param param the request object
     */
    public mediaItemControllerUpdate(param: MediaItemsApiMediaItemControllerUpdateRequest, options?: Configuration): Promise<void> {
        return this.api.mediaItemControllerUpdate(param.id, param.body,  options).toPromise();
    }
	

}




import { ObservablePlaylistsApi } from "./ObservableAPI";
import { PlaylistsApiRequestFactory, PlaylistsApiResponseProcessor} from "../apis/PlaylistsApi";

export interface PlaylistsApiPlaylistControllerCreateRequest {
    /**
     * 
     * @type CreatePlaylistDto
     * @memberof PlaylistsApiplaylistControllerCreate
     */
    createPlaylistDto: CreatePlaylistDto
}

export interface PlaylistsApiPlaylistControllerFindAllRequest {
}

export interface PlaylistsApiPlaylistControllerFindOneRequest {
    /**
     * 
     * @type string
     * @memberof PlaylistsApiplaylistControllerFindOne
     */
    id: string
}

export interface PlaylistsApiPlaylistControllerRemoveRequest {
    /**
     * 
     * @type string
     * @memberof PlaylistsApiplaylistControllerRemove
     */
    id: string
}

export interface PlaylistsApiPlaylistControllerShareRequest {
    /**
     * 
     * @type string
     * @memberof PlaylistsApiplaylistControllerShare
     */
    id: string
    /**
     * 
     * @type string
     * @memberof PlaylistsApiplaylistControllerShare
     */
    userId: string
}

export interface PlaylistsApiPlaylistControllerUpdateRequest {
    /**
     * 
     * @type string
     * @memberof PlaylistsApiplaylistControllerUpdate
     */
    id: string
    /**
     * 
     * @type UpdatePlaylistDto
     * @memberof PlaylistsApiplaylistControllerUpdate
     */
    updatePlaylistDto: UpdatePlaylistDto
}


export class ObjectPlaylistsApi {
    private api: ObservablePlaylistsApi

    public constructor(configuration: Configuration, requestFactory?: PlaylistsApiRequestFactory, responseProcessor?: PlaylistsApiResponseProcessor) {
        this.api = new ObservablePlaylistsApi(configuration, requestFactory, responseProcessor);
	}

    /**
     * @param param the request object
     */
    public playlistControllerCreate(param: PlaylistsApiPlaylistControllerCreateRequest, options?: Configuration): Promise<void> {
        return this.api.playlistControllerCreate(param.createPlaylistDto,  options).toPromise();
    }
	
    /**
     * @param param the request object
     */
    public playlistControllerFindAll(param: PlaylistsApiPlaylistControllerFindAllRequest, options?: Configuration): Promise<void> {
        return this.api.playlistControllerFindAll( options).toPromise();
    }
	
    /**
     * @param param the request object
     */
    public playlistControllerFindOne(param: PlaylistsApiPlaylistControllerFindOneRequest, options?: Configuration): Promise<void> {
        return this.api.playlistControllerFindOne(param.id,  options).toPromise();
    }
	
    /**
     * @param param the request object
     */
    public playlistControllerRemove(param: PlaylistsApiPlaylistControllerRemoveRequest, options?: Configuration): Promise<void> {
        return this.api.playlistControllerRemove(param.id,  options).toPromise();
    }
	
    /**
     * @param param the request object
     */
    public playlistControllerShare(param: PlaylistsApiPlaylistControllerShareRequest, options?: Configuration): Promise<void> {
        return this.api.playlistControllerShare(param.id, param.userId,  options).toPromise();
    }
	
    /**
     * @param param the request object
     */
    public playlistControllerUpdate(param: PlaylistsApiPlaylistControllerUpdateRequest, options?: Configuration): Promise<void> {
        return this.api.playlistControllerUpdate(param.id, param.updatePlaylistDto,  options).toPromise();
    }
	

}




import { ObservableUsersApi } from "./ObservableAPI";
import { UsersApiRequestFactory, UsersApiResponseProcessor} from "../apis/UsersApi";

export interface UsersApiUserControllerAuthorizeRequest {
}

export interface UsersApiUserControllerCreateRequest {
    /**
     * 
     * @type CreateUserDto
     * @memberof UsersApiuserControllerCreate
     */
    createUserDto: CreateUserDto
}

export interface UsersApiUserControllerFindAllRequest {
}

export interface UsersApiUserControllerFindOneRequest {
    /**
     * 
     * @type string
     * @memberof UsersApiuserControllerFindOne
     */
    id: string
}

export interface UsersApiUserControllerGetMediaRequest {
    /**
     * 
     * @type string
     * @memberof UsersApiuserControllerGetMedia
     */
    id: string
}

export interface UsersApiUserControllerGetPlaylistsRequest {
    /**
     * 
     * @type string
     * @memberof UsersApiuserControllerGetPlaylists
     */
    id: string
}

export interface UsersApiUserControllerGetShareItemsRequest {
    /**
     * 
     * @type string
     * @memberof UsersApiuserControllerGetShareItems
     */
    id: string
}

export interface UsersApiUserControllerGetSharedMediaItemsRequest {
    /**
     * 
     * @type string
     * @memberof UsersApiuserControllerGetSharedMediaItems
     */
    id: string
}

export interface UsersApiUserControllerGetSharedPlaylistsRequest {
    /**
     * 
     * @type string
     * @memberof UsersApiuserControllerGetSharedPlaylists
     */
    id: string
}

export interface UsersApiUserControllerLoginRequest {
}

export interface UsersApiUserControllerReadSharedItemRequest {
    /**
     * 
     * @type string
     * @memberof UsersApiuserControllerReadSharedItem
     */
    id: string
    /**
     * 
     * @type string
     * @memberof UsersApiuserControllerReadSharedItem
     */
    shareId: string
}

export interface UsersApiUserControllerRemoveRequest {
    /**
     * 
     * @type string
     * @memberof UsersApiuserControllerRemove
     */
    id: string
}

export interface UsersApiUserControllerUpdateRequest {
    /**
     * 
     * @type string
     * @memberof UsersApiuserControllerUpdate
     */
    id: string
    /**
     * 
     * @type UpdateUserDto
     * @memberof UsersApiuserControllerUpdate
     */
    updateUserDto: UpdateUserDto
}


export class ObjectUsersApi {
    private api: ObservableUsersApi

    public constructor(configuration: Configuration, requestFactory?: UsersApiRequestFactory, responseProcessor?: UsersApiResponseProcessor) {
        this.api = new ObservableUsersApi(configuration, requestFactory, responseProcessor);
	}

    /**
     * @param param the request object
     */
    public userControllerAuthorize(param: UsersApiUserControllerAuthorizeRequest, options?: Configuration): Promise<void> {
        return this.api.userControllerAuthorize( options).toPromise();
    }
	
    /**
     * @param param the request object
     */
    public userControllerCreate(param: UsersApiUserControllerCreateRequest, options?: Configuration): Promise<void> {
        return this.api.userControllerCreate(param.createUserDto,  options).toPromise();
    }
	
    /**
     * @param param the request object
     */
    public userControllerFindAll(param: UsersApiUserControllerFindAllRequest, options?: Configuration): Promise<void> {
        return this.api.userControllerFindAll( options).toPromise();
    }
	
    /**
     * @param param the request object
     */
    public userControllerFindOne(param: UsersApiUserControllerFindOneRequest, options?: Configuration): Promise<void> {
        return this.api.userControllerFindOne(param.id,  options).toPromise();
    }
	
    /**
     * @param param the request object
     */
    public userControllerGetMedia(param: UsersApiUserControllerGetMediaRequest, options?: Configuration): Promise<void> {
        return this.api.userControllerGetMedia(param.id,  options).toPromise();
    }
	
    /**
     * @param param the request object
     */
    public userControllerGetPlaylists(param: UsersApiUserControllerGetPlaylistsRequest, options?: Configuration): Promise<void> {
        return this.api.userControllerGetPlaylists(param.id,  options).toPromise();
    }
	
    /**
     * @param param the request object
     */
    public userControllerGetShareItems(param: UsersApiUserControllerGetShareItemsRequest, options?: Configuration): Promise<void> {
        return this.api.userControllerGetShareItems(param.id,  options).toPromise();
    }
	
    /**
     * @param param the request object
     */
    public userControllerGetSharedMediaItems(param: UsersApiUserControllerGetSharedMediaItemsRequest, options?: Configuration): Promise<void> {
        return this.api.userControllerGetSharedMediaItems(param.id,  options).toPromise();
    }
	
    /**
     * @param param the request object
     */
    public userControllerGetSharedPlaylists(param: UsersApiUserControllerGetSharedPlaylistsRequest, options?: Configuration): Promise<void> {
        return this.api.userControllerGetSharedPlaylists(param.id,  options).toPromise();
    }
	
    /**
     * @param param the request object
     */
    public userControllerLogin(param: UsersApiUserControllerLoginRequest, options?: Configuration): Promise<void> {
        return this.api.userControllerLogin( options).toPromise();
    }
	
    /**
     * @param param the request object
     */
    public userControllerReadSharedItem(param: UsersApiUserControllerReadSharedItemRequest, options?: Configuration): Promise<void> {
        return this.api.userControllerReadSharedItem(param.id, param.shareId,  options).toPromise();
    }
	
    /**
     * @param param the request object
     */
    public userControllerRemove(param: UsersApiUserControllerRemoveRequest, options?: Configuration): Promise<void> {
        return this.api.userControllerRemove(param.id,  options).toPromise();
    }
	
    /**
     * @param param the request object
     */
    public userControllerUpdate(param: UsersApiUserControllerUpdateRequest, options?: Configuration): Promise<void> {
        return this.api.userControllerUpdate(param.id, param.updateUserDto,  options).toPromise();
    }
	

}



