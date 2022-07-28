import {
  Configuration,
  Middleware,
  RequestArgs,
  ResponseArgs,
  servers,
  DefaultApi,
  SearchApi,
  MediaItemsApi,
  PlaylistsApi,
  PlaylistItemsApi,
  ShareItemsApi,
  UserApi,
  UsersApi,
  TagsApi,
  ViewsApi,
} from 'mediashare/rxjs-api';
import Config from 'mediashare/config';

function apiFactory() {
  function middlewareFactory() {
    let TOKEN = '';
    let COOKIE = '';
    let ID_TOKEN = '';
    // const sessionMiddleWare: Middleware = {

    // };
    const cookieMiddleware: Middleware = {
      post: (response: ResponseArgs) => {
        const originalEvent = response.xhr as any;

        const cookie = originalEvent.responseHeaders['Set-Cookie'];
        const token = originalEvent.responseHeaders.Authorization;
        const idToken = originalEvent.responseHeaders.Id;
        COOKIE = cookie ? cookie : COOKIE;
        TOKEN = token ? token : TOKEN;
        ID_TOKEN = idToken ? idToken : ID_TOKEN;
        // console.log(TOKEN);
        return response;
      },
      pre: (request: RequestArgs) => {
        const { headers: prevHeaders, ...rest } = request;

        const headers = {
          ...prevHeaders,
          Authorization: `Bearer ${TOKEN}`,
          cookie: COOKIE.split(';')[0],
          id: ID_TOKEN,
        };
        // console.log(headers);
        return { headers, ...rest };
      },
    };

    return [cookieMiddleware];
  }

  const configuration = new Configuration({
    basePath: servers[Config.API_SERVER].getUrl(),
    middleware: middlewareFactory(),
  });

  return {
    default: new DefaultApi(configuration),
    search: new SearchApi(configuration),
    mediaItems: new MediaItemsApi(configuration),
    playlists: new PlaylistsApi(configuration),
    playlistItems: new PlaylistItemsApi(configuration),
    shareItems: new ShareItemsApi(configuration),
    user: new UserApi(configuration),
    users: new UsersApi(configuration),
    views: new ViewsApi(configuration),
    tags: new TagsApi(configuration),
    configuration,
  };
}

const apis = apiFactory();
export type ApiService = typeof apis;

const { search, mediaItems, shareItems, playlists, playlistItems, user, users, views, tags, configuration } = apis;

export { apis, search, mediaItems, shareItems, playlists, playlistItems, user, users, views, tags, configuration };
