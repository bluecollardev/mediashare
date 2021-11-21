import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { EnumLiteralsOf } from '../core/lib/Generics';
import { routeConfig, ROUTES } from '../routes';
import { findMediaItems, getMediaItemById } from '../store/modules/media-items';
import { getUserPlaylists, getPlaylistById } from '../store/modules/playlists';

type RouteConfigKeyType = EnumLiteralsOf<typeof ROUTES>;
// @ts-ignore
type RouteParentKeyType = keyof Pick<typeof routeConfig, 'Browse' | 'Media' | 'Playlists' | 'Account'>;

export function useRouteName(key: RouteConfigKeyType) {
  const nav = useNavigation();
  // @ts-ignore
  return () => nav.navigate(key);
}

export function useRouteWithParams(key: EnumLiteralsOf<typeof ROUTES>) {
  const nav = useNavigation();

  // @ts-ignore
  return (params: { [x: string]: string }) => nav.navigate(key, params);
}

export function usePageRoute(key: RouteParentKeyType, child: RouteConfigKeyType) {
  const nav = useNavigation();
  // @ts-ignore
  return (params: Record<string, string | number>) => nav.navigate(key, { screen: child, params });
}

export function useGoBack() {
  const nav = useNavigation();
  return () => nav.goBack();
}

export function useViewPlaylist() {
  const nav = useNavigation();
  // @ts-ignore
  return ({ playlistId }) => nav.navigate(ROUTES?.playlistDetail, { playlistId });
}

// TODO: Why does this also just take playlistId, the old version used a mediaId, which may not also be correct, maybe both?
/* export function useViewPlaylistItem() {
  const nav = useNavigation();
  return ({ playlistId, uri }) => nav.navigate(ROUTES.playlistItemDetail, { playlistId, uri });
} */

/* export function useViewSharedMediaItem() {
  const nav = useNavigation();
  return ({ mediaId, uri }) => nav.navigate(ROUTES.sharedItemDetail, { mediaId, uri });
} */

export function useEditMediaItem() {
  const nav = useNavigation();
  const dispatch = useDispatch();
  return async ({ mediaId, uri }) => {
    await dispatch(getMediaItemById({ uri, mediaId }));
    // @ts-ignore
    nav.navigate(ROUTES.mediaItemEdit, { mediaId, uri });
  };
}
export function useViewMediaItem() {
  const nav = useNavigation();
  const dispatch = useDispatch();
  return async ({ mediaId, uri }) => {
    await dispatch(getMediaItemById({ uri, mediaId }));
    // @ts-ignore
    nav.navigate(ROUTES.mediaItemDetail, { mediaId, uri });
  };
}
export function useEditPlaylistById() {
  const nav = useNavigation();
  const dispatch = useDispatch();
  return async ({ playlistId }) => {
    await dispatch(getPlaylistById(playlistId));
    // @ts-ignore
    nav.navigate(ROUTES.playlistEdit, { playlistId });
  };
}

export function useViewPlaylistById() {
  const nav = useNavigation();
  const dispatch = useDispatch();
  return async ({ playlistId }: { playlistId: string }) => {
    await dispatch(getPlaylistById(playlistId));
    // @ts-ignore
    nav.navigate(ROUTES.playlistDetail, { playlistId });
  };
}

export function useViewProfileById() {
  const nav = useRouteWithParams(ROUTES.profile);
  return function (userId) {
    nav({ userId });
  };
}
export function usePlaylists() {
  const nav = useRouteName(ROUTES.playlists);
  const dispatch = useDispatch();
  return async function () {
    await dispatch(getUserPlaylists({}));
    nav();
  };
}

export function useMediaItems() {
  const nav = useRouteName(ROUTES.media);
  const dispatch = useDispatch();
  return async function () {
    // console.log(`useMediaItems > Dispatch findMediaItems`);
    await dispatch(findMediaItems({}));
    nav();
  };
}
