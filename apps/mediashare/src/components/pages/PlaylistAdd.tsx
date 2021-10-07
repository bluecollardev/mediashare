import React, { ReactNode, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useGoBack, useRouteName, useRouteWithParams } from '../../hooks/NavigationHooks';

import { ROUTES } from '../../routes';

import { useAppSelector } from '../../state';
import { findMediaItems } from '../../state/modules/media-items';
import { addUserPlaylist, findUserPlaylists } from '../../state/modules/playlists';

import { CreatePlaylistDto, CreatePlaylistDtoCategoryEnum } from '../../rxjs-api';

import { withLoadingSpinner, LoadingSpinnerProps } from '../hoc/withLoadingSpinner';

import { ActionButtons } from '../layout/ActionButtons';
import { MediaCard } from '../layout/MediaCard';
import { MediaList, MediaListType } from '../layout/MediaList';
import { titleValidator, descriptionValidator, categoryValidator } from '../layout/formConfig';
import { PageContainer, KeyboardAvoidingPageContent, PageActions } from '../layout/PageContainer';
import AppUpload from '../layout/AppUpload';
import { Button } from 'react-native-paper';
import { View } from 'react-native';
import { theme } from '../../styles';

interface PlaylistAddContainerProps extends LoadingSpinnerProps {
  children: ReactNode;
}

const PlaylistAdd = ({ endLoad, startLoad }: PlaylistAddContainerProps) => {
  const dispatch = useDispatch();

  const author = useAppSelector((state) => state?.user.username);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState(CreatePlaylistDtoCategoryEnum.Free);
  const [loaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState('');

  const [selected, setSelected] = useState([]);
  const goBack = useGoBack();

  const clearAndGoBack = function () {
    // @ts-ignore
    setTitle('');
    setCategory(CreatePlaylistDtoCategoryEnum.Free);
    // @ts-ignore
    setDescription('');
    setIsLoaded(false);
    goBack();
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const goToItem = useRouteWithParams(ROUTES.mediaItemDetail);
  const goToPlaylists = useRouteName(ROUTES.playlists);

  const actionLabel = 'Save';
  const cancelLabel = 'Cancel';
  const cancelCb = clearAndGoBack;

  const onMediaItemClick = (e) => {
    goToItem({ mediaId: e._id });
  };

  const isValid = function () {
    return !titleValidator(title) && !descriptionValidator(description) && !categoryValidator(category) && !(selected.length < 1) && imageSrc.length > 0;
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

  const onUpload = (uri: string) => {
    console.log(uri);
    setImageSrc(uri);
  };

  useEffect(() => {
    if (!loaded) {
      dispatch(findMediaItems());
      setIsLoaded(true);
    }
  }, [loaded, dispatch]);

  const saveItem = async function () {
    const dto: CreatePlaylistDto = {
      title,
      category: category,
      description,
      mediaIds: selected,
      imageSrc,
    };
    // const res = await dispatch(addUserPlaylist(dto));
    await dispatch(addUserPlaylist(dto));
    await dispatch(findUserPlaylists({}));

    // const item = res as any;
    // goToItem({ playlistId: item.payload.playlist._id });
    goToPlaylists();
  };

  return (
    <PageContainer>
      <KeyboardAvoidingPageContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <MediaCard
          title={title}
          author={author}
          description={description}
          showThumbnail={true}
          thumbnail={imageSrc}
          category={category}
          categoryOptions={options}
          onCategoryChange={setCategory as any}
          onTitleChange={setTitle as any}
          onDescriptionChange={setDescription as any}
          isEdit={true}
          topDrawer={() => (
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <View style={{ flex: 4 }}>
                <AppUpload startLoad={startLoad} endLoad={endLoad} onUpload={onUpload}>
                  <Button icon="cloud-upload" mode="outlined" dark color={theme.colors.accentDarker} compact>
                    Add Cover Photo
                  </Button>
                </AppUpload>
              </View>
            </View>
          )}
        />
        <MediaList
          list={list}
          selectable={true}
          showThumbnail={true}
          onViewDetail={onMediaItemClick}
          addItem={(item) => updateSelection(true, item)}
          removeItem={(item) => updateSelection(false, item)}
        />
      </KeyboardAvoidingPageContent>
      <PageActions>
        <ActionButtons
          rightIcon="check-circle"
          actionCb={() => saveItem()}
          cancelCb={cancelCb}
          actionLabel={actionLabel}
          cancelLabel={cancelLabel}
          disableAction={!isValid()}
        />
      </PageActions>
    </PageContainer>
  );
};

export default withLoadingSpinner(PlaylistAdd);
