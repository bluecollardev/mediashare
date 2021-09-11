import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { MediaItem } from '../../../rxjs-api';
// import { PlaylistResponseDto } from '../../../api';

import { findUserPlaylists } from '../../../state/modules/playlists';
import { useAppSelector } from '../../../state';

import { ScrollView } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { MediaListItem } from '../../layout/MediaListItem';
import { ActionButtons } from '../../layout/ActionButtons';

import { theme } from '../../../styles';

export interface AddFromCollectionProps {
  navigation: any;
  onViewDetail: () => void;
  items: MediaItem[];
}

export interface AddFromCollectionState {}

export const AddFromCollection = ({ onViewDetail = () => {} }: AddFromCollectionProps) => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);
  const loading = useAppSelector((state) => state.mediaItems.loading);
  const items = useAppSelector((state) => state.mediaItems.mediaItems);
  useEffect(() => {
    if (!loaded) {
      dispatch(findUserPlaylists({}));
      setLoaded(true);
    }
  }, [loaded, setLoaded, dispatch]);

  const updateMediaItem = function (add: boolean, selected: any) {
    const updatedItems = add ? selectedPlaylists.concat([selected]) : selectedPlaylists.filter((item) => item._id !== selected._id);
    setSelectedPlaylists(updatedItems);
  };

  if (!loaded || loading || items?.length < 1) {
    return <ActivityIndicator animating={true} color={theme.colors.accent} />;
  }
  return (
    <>
      <ScrollView>
        {items?.map((item, idx) => {
          const { title, description } = item;
          return (
            <MediaListItem
              key={`item-${idx}`}
              title={title}
              description={description}
              showThumbnail={false}
              checked={false}
              onChecked={(checked) => updateMediaItem(checked, item)}
              onViewDetail={onViewDetail}
            />
          );
        })}
      </ScrollView>
      <ActionButtons actionCb={() => {}} cancelCb={() => {}} />
    </>
  );
};

export default AddFromCollection;
