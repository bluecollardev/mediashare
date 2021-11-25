import {
  Configuration,
  DefaultApi,
  MediaItemsApi,
  Middleware,
  PlaylistsApi,
  RequestArgs,
  ResponseArgs,
  servers,
  ShareItemsApi,
  UserApi,
  UsersApi,
  ViewsApi,
} from '../rxjs-api';
import Config from '../config';

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

  console.log(`servers: ${JSON.stringify(servers)}`);
  console.log(`using configuration: ${JSON.stringify(Config.API_SERVER)}`);
  const configuration = new Configuration({
    basePath: servers[1].getUrl(),
    middleware: middlewareFactory(),
  });

  return {
    default: new DefaultApi(configuration),
    mediaItems: new MediaItemsApi(configuration),
    shareItems: new ShareItemsApi(configuration),
    playlists: new PlaylistsApi(configuration),
    user: new UserApi(configuration),
    users: new UsersApi(configuration),
    views: new ViewsApi(configuration),
    configuration,
  };
}

const apis = apiFactory();
export type ApiService = typeof apis;

const { mediaItems, shareItems, playlists, user, users, configuration } = apis;

export { apis, mediaItems, shareItems, playlists, user, users, configuration };
