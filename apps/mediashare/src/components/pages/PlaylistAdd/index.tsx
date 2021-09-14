import React, { ReactNode, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useGoBack, useRouteName, useRouteWithParams } from '../../../hooks/NavigationHooks';

import { ROUTES } from '../../../routes';

import { useAppSelector } from '../../../state';
import { findMediaItems } from '../../../state/modules/media-items';
import { addUserPlaylist, findUserPlaylists } from '../../../state/modules/playlists';

import { ActionButtons } from '../../layout/ActionButtons';
import { MediaCard } from '../../layout/MediaCard';
import { MediaList, MediaListType } from '../../layout/MediaList';

import { CreatePlaylistDto, CreatePlaylistDtoCategoryEnum } from '../../../rxjs-api';

import styles from '../../../styles';
import { titleValidator, descriptionValidator, categoryValidator } from '../../layout/formConfig';
import { minLength } from '../Login';
import PageContainer from '../../layout/PageContainer';
import { KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface PlaylistAddContainerProps {
  children: ReactNode;
}

function PlaylistAddContainer({}: PlaylistAddContainerProps) {
  const author = useAppSelector((state) => state?.user.username);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState(CreatePlaylistDtoCategoryEnum.Builder);
  const [loaded, setLoaded] = useState(false);

  const [selected, setSelected] = useState([]);
  const goBack = useGoBack();

  const clearAndGoBack = function () {
    // @ts-ignore
    setTitle('');
    setCategory(CreatePlaylistDtoCategoryEnum.Builder);
    // @ts-ignore
    setDescription('');
    setLoaded(false);
    goBack();
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const goToItem = useRouteWithParams(ROUTES.mediaItemDetail);
  const goToPlaylists = useRouteName(ROUTES.playlists);

  const actionLabel = 'Save';
  const cancelLabel = 'Cancel';
  const cancelCb = clearAndGoBack;

  const dispatch = useDispatch();

  const onMediaItemClick = (e) => {
    goToItem({ mediaId: e._id });
  };

  const isValid = function () {
    const test = !titleValidator(title) && !descriptionValidator(description) && !categoryValidator(category) && !(selected.length < 1);
    return test;
  };
  const updateSelection = function (bool: boolean, item: MediaListType) {
    const filtered = bool ? selected.concat([item._id]) : selected.filter((key) => key !== item._id);
    setSelected(filtered);
  };
  const options = [];
  for (const value in CreatePlaylistDtoCategoryEnum) {
    options.push(value);
  }
  const list = useAppSelector((state) => state.mediaItems.mediaItems);

  useEffect(() => {
    if (!loaded) {
      dispatch(findMediaItems());
      setLoaded(true);
    }
  }, [loaded, dispatch]);

  const saveItem = async function () {
    const dto: CreatePlaylistDto = {
      title,
      category: category,
      description,
      mediaIds: selected,
      createdBy: '',
    };
    // const res = await dispatch(addUserPlaylist(dto));
    await dispatch(addUserPlaylist(dto));
    await dispatch(findUserPlaylists({}));

    // const item = res as any;
    // goToItem({ playlistId: item.payload.playlist._id });
    goToPlaylists();
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    <PageContainer>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView>
            <MediaCard
              title={title}
              author={author}
              description={description}
              category={category}
              categoryOptions={options}
              onCategoryChange={setCategory as any}
              onTitleChange={setTitle as any}
              onDescriptionChange={setDescription as any}
              isEdit={true}
            />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <ScrollView>
        <MediaList
          isSelectable={true}
          list={list}
          showThumbnail={true}
          onViewDetail={onMediaItemClick}
          addItem={(item) => updateSelection(true, item)}
          removeItem={(item) => updateSelection(false, item)}
        />
      </ScrollView>

      <ActionButtons
        rightIcon={'add'}
        actionCb={() => saveItem()}
        cancelCb={cancelCb}
        actionLabel={actionLabel}
        cancelLabel={cancelLabel}
        disableAction={!isValid()}
      />
    </PageContainer>
  );
}

export default PlaylistAddContainer;
