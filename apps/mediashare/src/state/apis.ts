import { Configuration, Middleware, RequestArgs, ResponseArgs, servers } from '../rxjs-api';
import { UserApi, UsersApi, PlaylistsApi, DefaultApi, MediaItemsApi, ShareItemsApi } from '../rxjs-api';
import axios from 'axios';
import { request } from 'https';

let TOKEN = '';
let COOKIE = '';
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
  return [sessionMiddleWare, loginMiddleware, cookieMiddleware];
}

const configuration = new Configuration({ basePath: servers[0].getUrl(), accessToken: TOKEN, middleware: middlewareFactory() });
export const basePath = 'http://localhost:5000';

const apis = {
  default: new DefaultApi(configuration),
  mediaItems: new MediaItemsApi(configuration),
  shareItems: new ShareItemsApi(configuration),
  playlists: new PlaylistsApi(configuration),
  user: new UserApi(configuration),
  users: new UsersApi(configuration),
};

export type ApiService = typeof apis;

export { apis };
