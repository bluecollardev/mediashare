import { ConfigEnum } from '../types';

const PLAYLIST_CATEGORY = ['free', 'paid'] as const;
export type PlaylistCategoryType = ConfigEnum<typeof PLAYLIST_CATEGORY>;
const [freePlaylist, paidPlaylist] = PLAYLIST_CATEGORY;
const playlistCategories = { free: freePlaylist, paid: paidPlaylist };

const MEDIA_CATEGORY = ['free', 'paid'] as const;
export type MediaCategoryType = ConfigEnum<typeof MEDIA_CATEGORY>;
const [freeMedia, paidMedia] = MEDIA_CATEGORY;
const mediaCategories = { free: freeMedia, paid: paidMedia };

export { playlistCategories, mediaCategories, MEDIA_CATEGORY, PLAYLIST_CATEGORY };
