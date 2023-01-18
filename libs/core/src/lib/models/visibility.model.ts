import { ConfigEnum } from '../types';

const VISIBILITY_PRIVATE = 'private';
const VISIBILITY_PUBLIC = 'public';
const VISIBILITY_SHARED = 'shared';

const PLAYLIST_VISIBILITY = [VISIBILITY_PRIVATE, VISIBILITY_SHARED, VISIBILITY_PUBLIC] as const;
export type PlaylistVisibilityType = ConfigEnum<typeof PLAYLIST_VISIBILITY>;

const MEDIA_VISIBILITY = [VISIBILITY_PRIVATE, VISIBILITY_SHARED, VISIBILITY_PUBLIC] as const;
export type MediaVisibilityType = ConfigEnum<typeof MEDIA_VISIBILITY>;

export { MEDIA_VISIBILITY, PLAYLIST_VISIBILITY };
