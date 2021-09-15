import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { EnumLiteralsOf } from '../lib/Generics';
import { routeConfig, ROUTES } from '../routes';
import { findMediaItems, getMediaItemById } from '../state/modules/media-items';
import { findUserPlaylists, getPlaylistById } from '../state/modules/playlists/index';

type RouteConfigKeyType = EnumLiteralsOf<typeof ROUTES>;
// @ts-ignore
type RouteParentKeyType = keyof Pick<typeof routeConfig, 'explore' | 'media' | 'playlists' | 'settings'>;

export function useRouteName(key: RouteConfigKeyType) {
  const nav = useNavigation();
  return () => nav.navigate(key);
}

export function useRouteWithParams(key: EnumLiteralsOf<typeof ROUTES>) {
  const nav = useNavigation();

  return (params: { [x: string]: string }) => nav.navigate(key, params);
}

export function usePageRoute(key: RouteParentKeyType, child: RouteConfigKeyType) {
  const nav = useNavigation();
  return (params: Record<string, string | number>) => nav.navigate(key, { screen: child, params });
}

export function useGoBack() {
  const nav = useNavigation();
  return () => nav.goBack();
}

export function useViewPlaylist() {
  const nav = useNavigation();
  return ({ playlistId }) => nav.navigate(ROUTES.playlistDetail, { playlistId });
}

export function useViewPlaylistItem() {
  const nav = useNavigation();
  return ({ mediaId, uri }) => nav.navigate(ROUTES.playlistItemDetail, { mediaId, uri });
}

export function useViewSharedMediaItem() {
  const nav = useNavigation();
  return ({ mediaId, uri }) => nav.navigate(ROUTES.sharedItemDetail, { mediaId, uri });
}

export function useEditMediaItem() {
  const nav = useNavigation();
  const dispatch = useDispatch();
  return async ({ mediaId, uri }) => {
    await dispatch(getMediaItemById({ uri, mediaId }));
    nav.navigate(ROUTES.mediaItemEdit, { mediaId, uri });
  };
}

export function useViewPlaylistById() {
  const nav = useNavigation();
  const dispatch = useDispatch();
  return async ({ playlistId }) => {
    await dispatch(getPlaylistById(playlistId));
    nav.navigate(ROUTES.playlistEdit, { playlistId });
  };
}
export function usePlaylists() {
  const nav = useRouteName(ROUTES.playlists);
  const dispatch = useDispatch();
  return async function () {
    await dispatch(findUserPlaylists({}));
    nav();
  };
}

export function useMediaItems() {
  const nav = useRouteName(ROUTES.media);
  const dispatch = useDispatch();
  return async function () {
    await dispatch(findMediaItems());
    nav();
  };
}
