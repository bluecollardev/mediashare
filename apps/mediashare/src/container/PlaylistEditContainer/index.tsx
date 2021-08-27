import { Button, Container, Content, Icon, Text, View } from 'native-base';
import * as React from 'react';
import styles from '../../screens/Home/styles';

import PlaylistEdit from '../../screens/PlaylistEdit/index';
import { routeConfig, ROUTES } from '../../routes';
import ActionButtons from '../../components/layout/ActionButtons';
import { useAppSelector } from '../../state';
import { useDispatch } from 'react-redux';
import { createPlaylist } from '../../state/modules/create-playlist';
import { clearMediaItemSelection, findMediaItems } from '../../state/modules/media-items';
import { findUserPlaylists, getPlaylistById, updateUserPlaylist } from '../../state/modules/playlists/index';
import { PlaylistCard } from '../../components/layout/PlaylistCard';
import MediaList, { MediaListType } from '../../components/layout/MediaList';
import { usePageRoute, useRouteName, useRouteWithParams, useViewMediaItem } from '../../hooks/NavigationHooks';
import { MediaCard } from '../../components/layout/MediaCard';
import { useEffect, useState } from 'react';
import { CreatePlaylistDtoCategoryEnum } from '../../rxjs-api';
import { UpdatePlaylistDtoCategoryEnum } from '../../rxjs-api/models/UpdatePlaylistDto';
import { ListActionButton } from '../../components/layout/ListActionButton';

export interface PlaylistEditContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
}
export interface PlaylistEditContainerState {}

const PlaylistEditContainer = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { playlistId } = route.params;

  const [loaded, setLoaded] = React.useState(false);
  const playlist = useAppSelector((state) => state.playlist);
  const { selectedPlaylist } = playlist;
  const [title, setTitle] = useState(selectedPlaylist?.title);
  const [description, setDescription] = useState(selectedPlaylist?.description);
  const [category, setCategory] = useState(UpdatePlaylistDtoCategoryEnum[selectedPlaylist.category]);

  const selectedItems = new Set<string>();

  // const [selectedItems] = useState(new Set<string>());

  const loadData = async function () {
    await dispatch(getPlaylistById(playlistId));

    setLoaded(true);
  };

  const onTitleChange = setTitle;
  const onDescriptionChange = setDescription;
  const onCategoryChange = setCategory;
  const [selected, setSelected] = useState(selectedItems.size);
  const onAddItem = (item: MediaItem) => {
    console.log('🚀 -------------------------------------------------------');
    console.log('🚀 ~ file: index.tsx ~ line 52 ~ onAddItem ~ item', item);
    console.log('🚀 -------------------------------------------------------');
    selectedItems.add(item._id);
    setSelected(selectedItems.size);
  };

  const onRemoveItem = (item: MediaItem) => {
    selectedItems.delete(item._id);
    console.log(selectedItems.size);
    setSelected(selectedItems.size);
  };

  const options = [];
  for (const value in UpdatePlaylistDtoCategoryEnum) {
    options.push(value);
  }
  useEffect(() => {
    console.log(selectedItems);
  }, [selectedItems]);
  React.useEffect(() => {
    if (!playlist.loading && playlist.selectedPlaylist?._id !== playlistId) {
      loadData();
    }
  });
  const mediaItemRoute = useRouteWithParams(ROUTES.libraryItemDetail);
  const onViewMediaItemClicked = useViewMediaItem();
  async function saveItem() {
    dispatch(updateUserPlaylist({ title, items: Array.from(selectedItems.keys()), category: UpdatePlaylistDtoCategoryEnum[category] }));
  }
  if (!playlistId) {
    return <Text>Item not found</Text>;
  }

  // const {username} = useAppSelector((state) => state.user)

  const items = selectedPlaylist?.mediaItems || [];
  const author = '';

  const cancelCb = navigation.goBack;
  const actionLabel = 'Save';
  const cancelLabel = 'Cancel';
  return (
    <Container style={styles.container}>
      <View padder>
        <MediaCard
          title={title}
          author={author}
          description={description}
          category={category}
          categoryOptions={options}
          onCategoryChange={onCategoryChange as any}
          onTitleChange={onTitleChange}
          onDescriptionChange={onDescriptionChange}
          isEdit={true}
        />
      </View>
      <MediaList
        onViewDetail={(itm) => onViewMediaItemClicked({ mediaId: itm._id, uri: itm.uri })}
        list={items}
        isSelectable={true}
        removeItem={onRemoveItem}
        addItem={onAddItem}
      />
      {selected < 1 ? (
        <ActionButtons actionCb={() => saveItem()} cancelCb={cancelCb} actionLabel={actionLabel} cancelLabel={cancelLabel} />
      ) : (
        <ListActionButton danger={true} icon="trash" actionCb={() => saveItem()} label={'Delete Items'} />
      )}
    </Container>
  );
};

export default PlaylistEditContainer;
