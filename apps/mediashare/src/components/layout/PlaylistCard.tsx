import React from 'react';

import { MediaCard } from './MediaCard';
import { ActionSheet } from 'native-base';

export interface PlaylistCardProps {
  navigation?: any;
  showSocial?: any;
  buttons?: any;
  title?: string;
  author?: string;
  description?: string;
  showActions?: boolean;
  showThumbnail?: boolean;
  onEditClicked?: () => void;
  onDeleteClicked?: () => void;
  isEdit?: boolean;
}

const mediaCardButtons = ['Edit', 'Delete', 'Cancel'];
const destructive_idx = 1;
const cancel_idx = 2;

export const PlaylistCard: React.FC<PlaylistCardProps> = (props) => {
  const {
    navigation,
    title,
    author,
    description,
    showSocial,
    buttons,
    children,
    isEdit = false,
    showActions = false,
    showThumbnail = false,
    onEditClicked = () => {},
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
      showSocial={showSocial}
      buttons={buttons}
      children={children}
      showActions={showActions}
      showThumbnail={showThumbnail}
      onActionsClicked={showCardMenu}
      isEdit={isEdit}
    />
  );
};
