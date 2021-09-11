import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Container, Content, Icon, List, View } from 'native-base';
import { Text } from 'react-native';

import { routeConfig } from '../../../routes';

import { useGoBack, useViewMediaItem, useViewPlaylist } from '../../../hooks/NavigationHooks';

import { useAppSelector } from '../../../state';
import { getPlaylistById, updateUserPlaylist } from '../../../state/modules/playlists';
import { findMediaItems } from '../../../state/modules/media-items';

import { ActionButtons } from '../../layout/ActionButtons';
import { MediaList, MediaListType } from '../../layout/MediaList';
import { MediaListItem } from '../../layout/MediaListItem';

import { UpdatePlaylistDto } from '../../../rxjs-api';

import styles from '../../../styles';

export interface AddToPlaylistProps {
  navigation: any;
  list: any;
}

export interface AddToPlaylistState {}

class AddToPlaylist extends React.Component<AddToPlaylistProps, AddToPlaylistState> {
  render() {
    const { navigation } = this.props;
    const imageSrc = 'https://www.mapcom.com/wp-content/uploads/2015/07/video-placeholder.jpg';

    const items1 = [
      { title: 'Playlist 1', description: '9 Videos', image: imageSrc },
      { title: 'Playlist 2', description: '2 Videos', image: imageSrc },
      { title: 'Playlist 3', description: '3 Videos', image: imageSrc },
      { title: 'Playlist 4', description: '4 Videos', image: imageSrc },
    ];

    return (
      <Container style={styles.container}>
        <Content>
          <View>
            <List>
              {/* <ListItemGroup key={'group1'} text={'Group 1'} /> */}
              {items1.map((item, idx) => {
                const { title, description, image } = item;
                return (
                  <MediaListItem
                    key={`item-${idx}`}
                    title={title}
                    description={description}
                    image={image}
                    onViewDetail={() => navigation.navigate(routeConfig.playlistDetail.name)}
                    selectable={false}
                    showActions={false}
                  />
                );
              })}
            </List>
          </View>
          <View padder style={{ flexDirection: 'row' }}>
            <Button
              iconLeft
              bordered
              danger
              style={{
                flex: 1,
                marginRight: 10,
                justifyContent: 'center',
              }}
            >
              <Icon name="close-outline" />
              <Text style={{ paddingRight: 30 }}>Cancel</Text>
            </Button>
            <Button
              iconLeft
              bordered
              success
              style={{
                flex: 1,
                marginRight: 10,
                justifyContent: 'center',
              }}
            >
              <Icon name="add-outline" />
              <Text style={{ paddingRight: 30 }}>Add</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

export interface AddToPlaylistContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
}

export interface AddToPlaylistContainerState {}

export const AddToPlaylistContainer = ({ route }) => {
  const dispatch = useDispatch();
  const viewMediaItem = useViewMediaItem();
  const viewPlaylist = useViewPlaylist();
  const goBack = useGoBack();

  const actionCb = async () => {
    const { category } = playlist as any;
    const dto: UpdatePlaylistDto = {
      mediaIds: mediaItems.map((item) => item._id),
      description: playlist.description,
      title: playlist.title,
      category: category,
      _id: playlistId,
    };
    await dispatch(updateUserPlaylist(dto));
    setLoaded(false);
    viewPlaylist({ playlistId });
  };

  const cancelCb = () => {
    setLoaded(false);
    goBack();
  };
  const playlist = useAppSelector((state) => state.playlist.selectedPlaylist);

  const mediaItemState: MediaListType[] = useAppSelector((state) => state.mediaItems.mediaItems);

  const [loaded, setLoaded] = useState(false);
  const [mediaItems, setMediaItems] = useState(playlist?.mediaItems as MediaListType[]);

  const updateMediaItemsList = function (bool: boolean, mediaItem: MediaListType) {
    const filtered = bool ? mediaItems.concat([mediaItem]) : mediaItems.filter((item) => item._id !== mediaItem._id);
    setMediaItems(filtered);
  };

  const { playlistId } = route.params;

  useEffect(() => {
    if (!loaded) {
      dispatch(getPlaylistById(playlistId));
      dispatch(findMediaItems());
      setLoaded(true);
    }
  }, [loaded, dispatch, playlistId]);

  if (!loaded && !mediaItems) {
    return <Text>Loading</Text>;
  }
  return (
    <Container style={styles.container}>
      <MediaList
        list={mediaItemState}
        isSelectable={true}
        onViewDetail={(item) => viewMediaItem({ mediaId: item._id, uri: item.uri })}
        addItem={(e) => updateMediaItemsList(true, e)}
        removeItem={(e) => updateMediaItemsList(false, e)}
      />
      <ActionButtons actionCb={actionCb} actionLabel="Next" cancelLabel="Back" cancelCb={cancelCb} />
    </Container>
  );
};

export default AddToPlaylistContainer;
