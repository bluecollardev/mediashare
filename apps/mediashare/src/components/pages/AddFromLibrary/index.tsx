import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';

import { toggleMediaItem } from '../../../state/modules/media-items';

import { ListItemGroup } from '../../layout/ListItemGroup';
import { MediaListItem } from '../../layout/MediaListItem';

import { MediaItem } from '../../../rxjs-api';
import { findUserPlaylists } from '../../../state/modules/playlists';
import { useAppSelector } from '../../../state/index';
import { ScrollView, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { theme } from '../../../styles';
import { ActionButtons } from '../../layout/ActionButtons';
import { PlaylistResponseDto } from '../../../api/models/playlist-response-dto';

export interface AddFromProps {
  navigation: any;
  onViewDetail: () => void;
  items: MediaItem[];
}

export interface AddFromState {}

export const AddFrom = ({ onViewDetail = () => {} }: AddFromProps) => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);
  const { loading } = useAppSelector((state) => state.playlists.loading);
  const items = useAppSelector((state) => state.playlists.userPlaylists);
  useEffect(() => {
    if (!loaded) {
      dispatch(findUserPlaylists({}));
      setLoaded(true);
    }
  }, [loaded, setLoaded, dispatch]);

  const updateMediaItem = function (add: boolean, selected: PlaylistResponseDto) {
    const updatedItems = add ? selectedPlaylists.concat([selected]) : selectedPlaylists.filter((item) => item._id !== selected._id);
    setSelectedPlaylists(updatedItems);
  };

  function toggleField(id: number) {
    dispatch(toggleMediaItem(id));
  }
  console.log(items);
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

export default AddFrom;
