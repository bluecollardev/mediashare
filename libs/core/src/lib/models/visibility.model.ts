import { ConfigEnum } from '../types';

export const VISIBILITY_PRIVATE = 'private';
export const VISIBILITY_SHARED = 'shared';
export const VISIBILITY_SUBSCRIPTION = 'subscription';
export const VISIBILITY_PUBLIC = 'public';

const PLAYLIST_VISIBILITY = [VISIBILITY_PRIVATE, VISIBILITY_SHARED, VISIBILITY_SUBSCRIPTION, VISIBILITY_PUBLIC] as const;
export type PlaylistVisibilityType = ConfigEnum<typeof PLAYLIST_VISIBILITY>;

const MEDIA_VISIBILITY = [VISIBILITY_PRIVATE, VISIBILITY_SHARED, VISIBILITY_SUBSCRIPTION, VISIBILITY_PUBLIC] as const;
export type MediaVisibilityType = ConfigEnum<typeof MEDIA_VISIBILITY>;

export { MEDIA_VISIBILITY, PLAYLIST_VISIBILITY };
