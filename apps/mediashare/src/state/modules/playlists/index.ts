const PlaylistActions = ['GET_ITEMS', 'SOME_ACTION'] as const;

export type PlaylistActionKeysType = typeof PlaylistActions[number];

export { PlaylistActions };
