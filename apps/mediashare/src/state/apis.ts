import { loadStateAction, store } from '../boot/configureStore';
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
} from '../rxjs-api';
import Config from 'react-native-config';

console.log('dotenv config', Config.API_SERVER);

let TOKEN = '';
let COOKIE = '';

export const basePath = 'http://localhost:5000';

function apiFactory() {
  function middlewareFactory() {
    const sessionMiddleWare: Middleware = {
      pre: (request: RequestArgs) => {
        const { headers: prevHeaders, ...rest } = request;

        const headers = {
          ...prevHeaders,
          Authorization: `Bearer ${TOKEN}`,
          cookie: COOKIE,
          // cookie: 'connect.sid=s%3A2yl00r3D18IP6bGsdOvZpk87hskZIJZX.D31vWBjfaejkKUqqPNpP2zfDuZMt1%2Bf6FcXOKXK%2B9y0',
        };
        return { headers, ...rest };
      },
    };
    const cookieMiddleware: Middleware = {
      post: (response: ResponseArgs) => {
        const originalEvent = response.xhr as any;
        const cookie = originalEvent.responseHeaders['Set-Cookie'];
        COOKIE = cookie ? cookie : COOKIE;
        return response;
      },
    };
    const loginMiddleware: Middleware = {
      post: (response: ResponseArgs) => {
        if (response.request.url.includes('login')) {
          const { accessToken } = response.response as any;

          TOKEN = accessToken;
        }
        return response;
      },
    };
    const loaderMiddleware: Middleware = {
      pre: (request) => {
        loadStateAction(true);
        setTimeout(() => {
          loadStateAction(false);
        }, 3000);
        return request;
      },
      post: (response: ResponseArgs) => {
        // setTimeout(function () {
        loadStateAction(false);
        // }, 1000);
        console.log('rejected ', response);
        return response;
      },
    };
    return [sessionMiddleWare, loginMiddleware, cookieMiddleware, loaderMiddleware];
  }

  const configuration = new Configuration({
    basePath: servers[Config.API_SERVER].getUrl(),
    accessToken: TOKEN,
    middleware: middlewareFactory(),
  });

  return {
    default: new DefaultApi(configuration),
    mediaItems: new MediaItemsApi(configuration),
    shareItems: new ShareItemsApi(configuration),
    playlists: new PlaylistsApi(configuration),
    user: new UserApi(configuration),
    users: new UsersApi(configuration),
    configuration,
  };
}

const apis = apiFactory();
export type ApiService = typeof apis;

const { mediaItems, shareItems, playlists, user, users, configuration } = apis;

export { apis, mediaItems, shareItems, playlists, user, users, configuration };
