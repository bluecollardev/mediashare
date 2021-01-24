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
}

const mediaCardButtons = ['Edit', 'Delete', 'Cancel'];
const destructive_idx = 1;
const cancel_idx = 2;

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
    showActions = false,
    onEditClicked = () => {},
    onDeleteClicked = () => {}
  } = props;

  const showCardMenu = () => {
    ActionSheet.show(
      {
        options: mediaCardButtons,
        cancelButtonIndex: cancel_idx,
        destructiveButtonIndex: destructive_idx
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
      navigation={navigation}
      title={title}
      author={author}
      description={description}
      mediaSrc={image}
      buttons={buttons}
      content={content}
      children={children}
      showActions={showActions}
      onActionsClicked={showCardMenu}
    />
  );
};
