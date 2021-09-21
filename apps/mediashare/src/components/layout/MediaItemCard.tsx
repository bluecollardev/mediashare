import React from 'react';

import { MediaCard } from './MediaCard';
import { ActionSheet } from 'native-base';

export interface MediaItemCardProps {
  navigation?: any;
  buttons?: any;
  title?: string;
  author?: string;
  description?: string;
  image?: string;
  content?: any;
  showActions?: boolean;
  onEditClicked?: () => void;
  onDeleteClicked?: () => void;
  category?: string;
  mediaSrc?: string;
}

const mediaCardButtons = ['Edit', 'Delete', 'Cancel'];
const destructive_idx = 1;
const cancel_idx = 2;

export const MediaItemCard: React.FC<MediaItemCardProps> = (props) => {
  const {
    navigation,
    title = '',
    author = '',
    description = '',
    image,
    buttons,
    content,
    mediaSrc = '',
    children,
    showActions = true,
    onEditClicked = () => {},
    category = '',
    onDeleteClicked = () => {},
  } = props;

  const showCardMenu = () => {
    ActionSheet.show(
      {
        options: mediaCardButtons,
        cancelButtonIndex: cancel_idx,
        destructiveButtonIndex: destructive_idx,
      },
      (buttonIdx) => {
        switch (buttonIdx) {
          case 0:
            onEditClicked();
            break;
          case 1:
            onDeleteClicked();
            break;
        }
      }
    );
  };

  return (
    <MediaCard
      title={title}
      author={author}
      description={description}
      mediaSrc={mediaSrc}
      category={category}
      showActions={showActions}
      onActionsClicked={showCardMenu}
      buttons={buttons}
      showSocial={false}
      children={children}
      thumbnail={image}
    />
  );
};
