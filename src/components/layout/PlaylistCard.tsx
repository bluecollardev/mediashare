import * as React from 'react';

import { MediaCard } from './MediaCard';

export interface PlaylistCardProps {
  navigation?: any;
  buttons?: any;
  title?: string;
  author?: string;
  description?: string;
}

export const PlaylistCard: React.FC<PlaylistCardProps> = (props) => {
  const { navigation, title, author, description, buttons, children } = props;

  return (
    <MediaCard
      navigation={navigation}
      title={title}
      author={author}
      description={description}
      buttons={buttons}
      children={children}
    />
  );
};
