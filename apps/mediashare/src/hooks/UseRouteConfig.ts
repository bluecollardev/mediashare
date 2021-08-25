import { routeConfig } from '../routes';

export function useRouteName(key: keyof typeof routeConfig) {
  return routeConfig[key].name;
}
