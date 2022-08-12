import { useNavigation } from '@react-navigation/native';
import { getPlaylistItemById } from 'mediashare/store/modules/playlistItem';
import { useDispatch } from 'react-redux';
import { EnumLiteralsOf } from 'mediashare/core/generics';
import { routeConfig, routeNames } from 'mediashare/routes';
import { getMediaItemById } from 'mediashare/store/modules/mediaItem';
import { findMediaItems } from 'mediashare/store/modules/mediaItems';
import { getUserPlaylists } from 'mediashare/store/modules/playlists';
import { getPlaylistById } from 'mediashare/store/modules/playlist';

// TODO: Fix ts-ignores!

type RouteConfigKeyType = EnumLiteralsOf<typeof routeNames>;
// @ts-ignore
type RouteParentKeyType = keyof Pick<typeof routeConfig, 'Browse' | 'Media' | 'Playlists' | 'Account'>;

export function useGoToAccount() {
  const nav = useNavigation();
  // @ts-ignore
  return () => nav.navigate('Account');
}

export function useGoToLogin() {
  const nav = useNavigation();
  // @ts-ignore
  return () => nav.navigate('Public');
}

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

export function useViewProfileById() {
  const nav = useRouteWithParams(routeNames.contact);
  return function (userId) {
    nav({ userId });
  };
}

export function useViewItemsSharedByMe() {
  const nav = useRouteWithParams(routeNames.sharedWithContact);
  return function (contactUserId) {
    nav({ userId: contactUserId });
  };
}

export function useViewItemsSharedWithMe() {
  const nav = useRouteWithParams(routeNames.sharedByContact);
  return function (contactUserId) {
    nav({ userId: contactUserId });
  };
}

export function usePlaylists() {
  const nav = useRouteName(routeNames.playlists);
  const dispatch = useDispatch();
  return async function () {
    await dispatch(getUserPlaylists());
    nav();
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

export function useEditPlaylistById() {
  const nav = useNavigation();
  const dispatch = useDispatch();
  return async ({ playlistId }) => {
    await dispatch(getPlaylistById(playlistId));
    // @ts-ignore
    nav.navigate(routeNames.playlistEdit, { playlistId });
  };
}

export function useViewPlaylistItemById() {
  const nav = useNavigation();
  const dispatch = useDispatch();
  return async ({ playlistItemId = undefined, mediaId = undefined, uri = undefined }) => {
    console.log('useViewPlaylistItemById handler');
    console.log(playlistItemId);
    console.log(mediaId);
    console.log(uri);
    if (playlistItemId) {
      await dispatch(getPlaylistItemById({ playlistItemId, uri }));
      // @ts-ignore
      nav.navigate(routeNames.playlistItemDetail, { playlistItemId, uri });
    } else if (mediaId) {
      await dispatch(getMediaItemById({ mediaId, uri }));
      // @ts-ignore
      nav.navigate(routeNames.mediaItemDetail, { mediaId, uri });
    }
  };
}

export function useEditPlaylistItemById() {
  const nav = useNavigation();
  const dispatch = useDispatch();
  return async ({ playlistItemId = undefined, uri = undefined }) => {
    await dispatch(getPlaylistItemById({ playlistItemId, uri }));
    // @ts-ignore
    nav.navigate(routeNames.playlistItemEdit, { playlistItemId, uri });
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

export function useViewMediaItemById() {
  const nav = useNavigation();
  const dispatch = useDispatch();
  return async ({ mediaId, uri }) => {
    await dispatch(getMediaItemById({ mediaId, uri }));
    // @ts-ignore
    nav.navigate(routeNames.mediaItemDetail, { mediaId, uri });
  };
}

export function useEditMediaItemById() {
  const nav = useNavigation();
  const dispatch = useDispatch();
  return async ({ mediaId, uri }) => {
    await dispatch(getMediaItemById({ mediaId, uri }));
    // @ts-ignore
    nav.navigate(routeNames.mediaItemEdit, { mediaId, uri });
  };
}

// TODO: Why does this also just take playlistId, the old version used a mediaId, which may not also be correct, maybe both?
/* export function useViewSharedMediaItem() {
  const nav = useNavigation();
  return ({ mediaId, uri }) => nav.navigate(routeNames.sharedItemDetail, { mediaId, uri });
} */

export function useViewFeedSharedWithMe() {
  const nav = useNavigation();
  return async () => {
    // @ts-ignore
    nav.navigate(routeNames.feedSharedWithMe);
  };
}
