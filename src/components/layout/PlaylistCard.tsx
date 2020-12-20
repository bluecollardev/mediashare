import * as React from 'react';

import { MediaCard } from './MediaCard';

export interface PlaylistCardProps {
  navigation?: any;
}

export const PlaylistCard = (props: PlaylistCardProps) => {
  const { navigation } = props;
  return <MediaCard navigation={navigation} />;
};
