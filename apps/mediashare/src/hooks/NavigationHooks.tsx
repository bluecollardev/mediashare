import { useNavigation } from '@react-navigation/native';
import { EnumLiteralsOf } from '../lib/Generics';
import { routeConfig, ROUTES } from '../routes';
type RouteConfigKeyType = keyof typeof routeConfig;
type RouteParentKeyType = keyof Pick<typeof routeConfig, 'explore' | 'library' | 'playlists' | 'settings'>;

export function useRouteName(key: RouteConfigKeyType) {
  const nav = useNavigation();
  return () => nav.navigate(key);
}

export function useRouteWithParams(key: EnumLiteralsOf<typeof ROUTES>) {
  const nav = useNavigation();

  return (params: { [x: string]: string }) => nav.navigate(key, params);
}

export function usePageRoute(key: RouteParentKeyType, child: RouteConfigKeyType, params: Record<string, string | number>) {
  const nav = useNavigation();
  return () => nav.navigate(key, { screen: child });
}
