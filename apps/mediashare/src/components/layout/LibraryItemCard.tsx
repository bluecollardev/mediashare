import * as React from 'react';

import { MediaCard } from './MediaCard';
import { ActionSheet } from 'native-base';

export interface LibraryItemCardProps {
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
}

const mediaCardButtons = ['Edit', 'Delete', 'Cancel'];
const destructive_idx = 1;
const cancel_idx = 2;

export const LibraryItemCard: React.FC<LibraryItemCardProps> = (props) => {
  const {
    navigation,
    title = '',
    author = '',
    description = '',
    image,
    buttons,
    content,
    children,
    showActions = false,
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
      mediaSrc={image}
      category={category}
      showActions={showActions}
      onActionsClicked={showCardMenu}
      buttons={buttons}
      showSocial={true}
      children={children}
    />
  );
};
