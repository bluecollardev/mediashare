import * as React from 'react';

import { MediaCard } from './MediaCard';

export interface PlaylistItemCardProps {
  navigation?: any;
}

export const PlaylistItemCard = (props: PlaylistItemCardProps) => {
  const { navigation } = props;
  return <MediaCard navigation={navigation} />;
};
