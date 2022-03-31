import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { EnumLiteralsOf } from 'mediashare/core/generics';
import { routeConfig, routeNames } from 'mediashare/routes';
import { getMediaItemById } from 'mediashare/store/modules/mediaItem';
import { findMediaItems } from 'mediashare/store/modules/mediaItems';
import { getPlaylistById } from 'mediashare/store/modules/playlist';
import { getUserPlaylists } from 'mediashare/store/modules/playlists';

type RouteConfigKeyType = EnumLiteralsOf<typeof routeNames>;
// @ts-ignore
type RouteParentKeyType = keyof Pick<typeof routeConfig, 'Browse' | 'Media' | 'Playlists' | 'Account'>;

export function useRouteName(key: RouteConfigKeyType) {
  const nav = useNavigation();
  // @ts-ignore
  return () => nav.navigate(key);
}

export function useRouteWithParams(key: EnumLiteralsOf<typeof routeNames>) {
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
  return ({ playlistId }) => nav.navigate(routeNames?.playlistDetail, { playlistId });
}

// TODO: Why does this also just take playlistId, the old version used a mediaId, which may not also be correct, maybe both?
/* export function useViewPlaylistItem() {
  const nav = useNavigation();
  return ({ playlistId, uri }) => nav.navigate(routeNames.playlistItemDetail, { playlistId, uri });
} */

/* export function useViewSharedMediaItem() {
  const nav = useNavigation();
  return ({ mediaId, uri }) => nav.navigate(routeNames.sharedItemDetail, { mediaId, uri });
} */

export function useEditMediaItem() {
  const nav = useNavigation();
  const dispatch = useDispatch();
  return async ({ mediaId, uri }) => {
    await dispatch(getMediaItemById({ uri, mediaId }));
    // @ts-ignore
    nav.navigate(routeNames.mediaItemEdit, { mediaId, uri });
  };
}
export function useViewMediaItem() {
  const nav = useNavigation();
  const dispatch = useDispatch();
  return async ({ mediaId, uri }) => {
    await dispatch(getMediaItemById({ uri, mediaId }));
    // @ts-ignore
    nav.navigate(routeNames.mediaItemDetail, { mediaId, uri });
  };
}
export function useEditPlaylistById() {
  const nav = useNavigation();
  const dispatch = useDispatch();
  return async ({ playlistId }) => {
    await dispatch(getPlaylistById(playlistId));
    // @ts-ignore
    nav.navigate(routeNames.playlistEdit, { playlistId });
  };
}

export function useViewPlaylistById() {
  const nav = useNavigation();
  const dispatch = useDispatch();
  return async ({ playlistId }: { playlistId: string }) => {
    await dispatch(getPlaylistById(playlistId));
    // @ts-ignore
    nav.navigate(routeNames.playlistDetail, { playlistId });
  };
}

export function useViewProfileById() {
  const nav = useRouteWithParams(routeNames.profile);
  return function (userId) {
    nav({ userId });
  };
}
export function usePlaylists() {
  const nav = useRouteName(routeNames.playlists);
  const dispatch = useDispatch();
  return async function () {
    await dispatch(getUserPlaylists({}));
    nav();
  };
}

export function useMediaItems() {
  const nav = useRouteName(routeNames.media);
  const dispatch = useDispatch();
  return async function () {
    await dispatch(findMediaItems({}));
    nav();
  };
}
