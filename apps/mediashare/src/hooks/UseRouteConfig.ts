import { routeConfig } from '../routes';
type RouteConfigKeyType = keyof typeof routeConfig;
type RouteParentKeyType = keyof Pick<typeof routeConfig, 'explore' | 'library' | 'playlists' | 'settings'>;

export function useRouteName(key: RouteConfigKeyType) {
  return routeConfig[key].name;
}

export function usePageRoute(key: Pick<typeof routeConfig, ''>, child: RouteParentKeyType) {}
