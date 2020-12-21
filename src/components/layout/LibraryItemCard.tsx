import * as React from 'react';

import { MediaCard } from './MediaCard';

export interface LibraryItemCardProps {
  navigation?: any;
}

export const LibraryItemCard = (props: LibraryItemCardProps) => {
  const { navigation } = props;
  return <MediaCard navigation={navigation} />;
};
