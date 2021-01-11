import * as React from 'react';

import { MediaCard } from './MediaCard';
import { Button, Icon, Text } from 'native-base';

export interface LibraryItemCardProps {
  navigation?: any;
  buttons?: any;
  title?: string;
  author?: string;
  description?: string;
  image?: string;
  content?: any;
}

export const LibraryItemCard: React.FC<LibraryItemCardProps> = (props) => {
  const {
    navigation,
    title,
    author,
    description,
    image,
    buttons,
    content,
    children,
  } = props;

  return (
    <MediaCard
      navigation={navigation}
      title={title}
      author={author}
      description={description}
      mediaSrc={image}
      buttons={buttons}
      content={content}
      children={children}
    />
  );
};
