import { ConfigEnum } from '../types/configEnum.type';

const PLAYLIST_CATEGORY = ['Rehab', 'Builder', 'Warmup'] as const;

export type PlaylistCategoryType = ConfigEnum<typeof PLAYLIST_CATEGORY>;
const [rehab, builder, warmup] = PLAYLIST_CATEGORY;

const MEDIA_CATEGORY = ['strength', 'flexibility', 'endurance'] as const;

export type MediaCategoryType = ConfigEnum<typeof MEDIA_CATEGORY>;

const [strength, flexibility, endurance] = MEDIA_CATEGORY;

const playlistCategories = { rehab, builder, warmup };

const mediaCategories = { strength, flexibility, endurance };

export { playlistCategories, mediaCategories, MEDIA_CATEGORY, PLAYLIST_CATEGORY };
