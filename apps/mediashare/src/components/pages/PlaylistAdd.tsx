import React, { ReactNode, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useGoBack, useRouteWithParams } from '../../hooks/NavigationHooks';

import { ROUTES } from '../../routes';

import { useAppSelector } from '../../state';
import { findMediaItems } from '../../state/modules/media-items';
import { addUserPlaylist, findUserPlaylists, getPlaylistById } from '../../state/modules/playlists';

import { CreatePlaylistDto, PlaylistCategoryType } from '../../rxjs-api';

import { withLoadingSpinner, LoadingSpinnerProps } from '../hoc/withLoadingSpinner';

import { ActionButtons } from '../layout/ActionButtons';
import { MediaCard } from '../layout/MediaCard';
import { titleValidator, descriptionValidator, categoryValidator } from '../layout/formConfig';
import { PageContainer, KeyboardAvoidingPageContent, PageActions } from '../layout/PageContainer';
import AppUpload from '../layout/AppUpload';
import { Button } from 'react-native-paper';
import { View } from 'react-native';

import { theme } from '../../styles';

interface PlaylistAddContainerProps extends LoadingSpinnerProps {
  children: ReactNode;
}

const PlaylistAdd = ({}: PlaylistAddContainerProps) => {
  const dispatch = useDispatch();

  const author = useAppSelector((state) => state?.user.username);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState(PlaylistCategoryType.Free);
  const [loaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selected, setSelected] = useState([]);
  const goBack = useGoBack();
  const edit = useRouteWithParams(ROUTES.playlistEdit);

  const clearAndGoBack = function () {
    // @ts-ignore
    setTitle('');
    setCategory(PlaylistCategoryType.Free);
    // @ts-ignore
    setDescription('');
    setIsLoaded(false);
    goBack();
  };

  const actionLabel = 'Create';
  const cancelLabel = 'Cancel';
  const cancelCb = clearAndGoBack;

  const isValid = function () {
    return !titleValidator(title) && !descriptionValidator(description) && !categoryValidator(category);
  };

  const options = [];

  for (const value in PlaylistCategoryType) {
    options.push(value);
  }

  const onUpload = (uri: string) => {
    setImageSrc(uri);
  };

  useEffect(() => {
    if (!loaded) {
      dispatch(findMediaItems());
      setIsLoaded(true);
    }
  }, [loaded, dispatch]);

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
                <AppUpload onUpload={onUpload}>
                  <Button icon="cloud-upload" mode="outlined" dark color={theme.colors.accentDarker} compact>
                    Add Cover Photo
                  </Button>
                </AppUpload>
              </View>
            </View>
          )}
        />
      </KeyboardAvoidingPageContent>
      <PageActions>
        <ActionButtons
          rightIcon="check-circle"
          actionCb={() => savePlaylist()}
          cancelCb={cancelCb}
          actionLabel={actionLabel}
          cancelLabel={cancelLabel}
          disableAction={!isValid()}
        />
      </PageActions>
    </PageContainer>
  );

  async function savePlaylist() {
    const dto: CreatePlaylistDto = {
      title,
      category: category,
      description,
      mediaIds: selected,
      imageSrc,
    };

    // @ts-ignore TODO: Fix types on dispatch?
    const { payload } = await dispatch(addUserPlaylist(dto));
    const playlistId = payload.playlist._id;
    await dispatch(findUserPlaylists({}));
    await dispatch(getPlaylistById(playlistId));
    editPlaylist(playlistId);
  }

  async function editPlaylist(playlistId) {
    edit({ playlistId });
  }
};

export default withLoadingSpinner(PlaylistAdd);
