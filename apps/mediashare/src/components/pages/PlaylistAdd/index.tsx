import React, { ReactNode, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Content, View } from 'native-base';

import { useGoBack, useRouteName, useRouteWithParams } from '../../../hooks/NavigationHooks';

import { ROUTES } from '../../../routes';

import { useAppSelector } from '../../../state';
import { findMediaItems } from '../../../state/modules/media-items';
import { addUserPlaylist, findUserPlaylists } from '../../../state/modules/playlists';

import { ActionButtons } from '../../layout/ActionButtons';
import { MediaCard } from '../../layout/MediaCard';
import { MediaList } from '../../layout/MediaList';

import { CreatePlaylistDto, CreatePlaylistDtoCategoryEnum, MediaItem } from '../../../rxjs-api';

import styles from '../../../styles';

interface PlaylistAddContainerProps {
  children: ReactNode;
}

function PlaylistAddContainer({}: PlaylistAddContainerProps) {
  const selectedItems = new Set<string>();
  const author = useAppSelector((state) => state?.user.username);
  const [title, setTitle] = useState('Title');
  const [description, setDescription] = useState('Description');
  const [category, setCategory] = useState(CreatePlaylistDtoCategoryEnum.Builder);
  const [loaded, setLoaded] = useState(false);
  const goBack = useGoBack();

  const clearAndGoBack = function () {
    setTitle('Title');
    setCategory(CreatePlaylistDtoCategoryEnum.Builder);
    setDescription('Description');
    setLoaded(false);
    goBack();
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const goToItem = useRouteWithParams(ROUTES.playlistDetail);
  const goToPlaylists = useRouteName(ROUTES.playlists);

  const actionLabel = 'Save';
  const cancelLabel = 'Cancel';
  const cancelCb = clearAndGoBack;

  const dispatch = useDispatch();

  const onMediaItemClick = (e) => {
    console.log(e);
  };

  const onTitleChange = setTitle;
  const onDescriptionChange = setDescription;
  const onCategoryChange = setCategory;
  const onAddItem = (item: MediaItem) => selectedItems.add(item._id);

  const onRemoveItem = (item: MediaItem) => selectedItems.delete(item._id);

  const options = [];
  for (const value in CreatePlaylistDtoCategoryEnum) {
    options.push(value);
  }
  const list = useAppSelector((state) => state.mediaItems.mediaItems);

  useEffect(() => {
    console.log('run');
    if (!loaded) {
      dispatch(findMediaItems());
      setLoaded(true);
    }
  }, [loaded, dispatch]);

  const saveItem = async function () {
    const dto: CreatePlaylistDto = {
      title,
      category: CreatePlaylistDtoCategoryEnum[category],
      description,
      mediaIds: Array.from(selectedItems.values()),
      createdBy: '',
    };
    console.log(dto);
    // const res = await dispatch(addUserPlaylist(dto));
    await dispatch(addUserPlaylist(dto));
    await dispatch(findUserPlaylists({}));

    // const item = res as any;
    // goToItem({ playlistId: item.payload.playlist._id });
    goToPlaylists();
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      <Content>
        <MediaList isSelectable={true} list={list} onViewDetail={onMediaItemClick} addItem={onAddItem} removeItem={onRemoveItem} showThumbnail={true} />
      </Content>
      <ActionButtons actionCb={() => saveItem()} cancelCb={cancelCb} actionLabel={actionLabel} cancelLabel={cancelLabel} />
    </Container>
  );
}

export default PlaylistAddContainer;
