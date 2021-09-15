import React, { useEffect, useState } from 'react';
import { Storage } from 'aws-amplify';

import { usePreviewImage } from '../../hooks/UsePreviewImage';
import { Avatar, Caption, Checkbox, IconButton, List } from 'react-native-paper';
import { theme } from '../../styles';

export interface MediaListItemProps {
  navigation?: any;
  title?: string;
  description?: string;
  image?: string;
  selectable?: boolean;
  showActions?: boolean;
  showThumbnail?: boolean;
  checked?: boolean;
  onViewDetail?: () => void;
  onChecked?: (bool: boolean) => void;
}

const AvatarComponent = (uri: any) => {
  return <Avatar.Image size={24} source={{ uri: uri.uri }} />;
};

export const MediaListItem: React.FC<MediaListItemProps> = ({
  checked,
  image,
  description,
  title,
  onViewDetail,
  onChecked = () => {},
  selectable = true,
  showActions = true,
  showThumbnail = false,
}: MediaListItemProps) => {
  const [isChecked, setIsChecked] = useState(checked);
  const DEFAULT_IMAGE = usePreviewImage();

  const [source, setSource] = useState(null);

  useEffect(() => {
    if (image) {
      Storage.get(image, { download: false }).then((res: string) => {
        setSource({ uri: res });
      });
    }
  }, [image]);
  useEffect(() => {}, [source]);
  return (
    <List.Item
      title={title}
      description={() => {
        return <Caption onPress={onViewDetail}>{description}</Caption>;
      }}
      left={() =>
        selectable ? (
          <>
            <Checkbox
              status={!isChecked ? 'indeterminate' : 'checked'}
              onPress={() => {
                console.log('checked status', isChecked);
                setIsChecked(!isChecked);
                onChecked(!isChecked);
              }}
              color={isChecked ? theme.colors.success : theme.colors.disabled}
            />
            {showThumbnail ? source ? <Avatar.Image size={36} source={source} /> : <Avatar.Image size={36} source={{ uri: DEFAULT_IMAGE }} /> : <></>}
          </>
        ) : showThumbnail ? (
          source ? (
            <Avatar.Image size={36} source={source} />
          ) : (
            <Avatar.Image size={36} source={{ uri: DEFAULT_IMAGE }} />
          )
        ) : (
          <></>
        )
      }
      right={() => showActions === true && <IconButton icon="chevron-right" color={theme.colors.accent} onPress={onViewDetail} />}
    />
  );
};
