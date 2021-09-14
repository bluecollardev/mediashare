import { useNavigation } from '@react-navigation/native';
import { EnumLiteralsOf } from '../lib/Generics';
import { routeConfig, ROUTES } from '../routes';

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

export function useViewMediaItem() {
  const nav = useNavigation();
  return ({ mediaId, uri }) => nav.navigate(ROUTES.mediaItemDetail, { mediaId, uri });
}
