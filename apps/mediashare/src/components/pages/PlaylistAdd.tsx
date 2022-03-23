import React, { useEffect, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { useDispatch } from 'react-redux';

import { useGoBack, useRouteWithParams } from '../../hooks/NavigationHooks';

import { routeNames } from '../../routes';

import { useAppSelector } from '../../store';
import { findMediaItems } from '../../store/modules/media-items';
import { addUserPlaylist, getUserPlaylists, getPlaylistById } from '../../store/modules/playlists';

import { CreatePlaylistDto, PlaylistCategoryType } from '../../rxjs-api';

import { withLoadingSpinner } from '../hoc/withLoadingSpinner';

import { ActionButtons } from '../layout/ActionButtons';
import { MediaCard } from '../layout/MediaCard';
import { titleValidator, descriptionValidator, tagValidator, categoryValidator } from '../layout/formConfig';
import { PageContainer, KeyboardAvoidingPageContent, PageActions, PageProps } from '../layout/PageContainer';
import { AppUpload } from '../layout/AppUpload';

import { UploadPlaceholder } from '../layout/UploadPlaceholder';
import { theme } from '../../styles';
import { Button } from 'react-native-paper';
import { withGlobalStateConsumer } from '../../core/globalState';

// @ts-ignore
const PlaylistAdd = ({ globalState = { tags: [] } }: PageProps) => {
  const { tags = [] } = globalState;

  const dispatch = useDispatch();

  const author = useAppSelector((state) => state?.user.username);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState(PlaylistCategoryType.Free);
  const [selectedTagKeys, setSelectedTagKeys] = useState([]);
  const [loaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selected, setSelected] = useState([]);
  const goBack = useGoBack();
  const edit = useRouteWithParams(routeNames.playlistEdit);

  const clearAndGoBack = function () {
    // @ts-ignore
    setTitle('');
    setCategory(PlaylistCategoryType.Free);
    setSelectedTagKeys([]);
    // @ts-ignore
    setDescription('');
    setIsLoaded(false);
    goBack();
  };

  const cancelCb = clearAndGoBack;

  const isValid = function () {
    return !titleValidator(title) && !descriptionValidator(description) && !categoryValidator(category);
  };

  const options = [];

  for (const value in PlaylistCategoryType) {
    options.push(value);
  }

  const onUploadComplete = (uri: string) => {
    setImageSrc(uri);
  };

  useEffect(() => {
    if (!loaded) {
      const { search } = globalState;
      const args = { text: search?.filters?.text ? search.filters.text : '' };
      // console.log(`PlaylistAdd.useEffect > Dispatch findMediaItems with args: ${JSON.stringify(args, null, 2)}`);
      dispatch(findMediaItems(args));
      setIsLoaded(true);
    }
  }, [loaded, dispatch, globalState]);

  return (
    <PageContainer>
      <KeyboardAvoidingPageContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <ScrollView>
          <MediaCard
            title={title}
            author={author}
            description={description}
            showThumbnail={!!imageSrc}
            thumbnail={imageSrc}
            category={category}
            categoryOptions={options}
            onCategoryChange={setCategory as any}
            availableTags={tags}
            tags={selectedTagKeys}
            tagOptions={options}
            onTagChange={(e: any) => {
              setSelectedTagKeys(e);
            }}
            onTitleChange={setTitle as any}
            onDescriptionChange={setDescription as any}
            isEdit={true}
            topDrawer={() =>
              !imageSrc ? (
                <AppUpload uploadMode="photo" onUploadComplete={onUploadComplete}>
                  <UploadPlaceholder buttonText="Add Cover Photo" />
                </AppUpload>
              ) : (
                <AppUpload uploadMode="photo" onUploadComplete={onUploadComplete}>
                  <Button mode="outlined" dark color={theme.colors.default} compact uppercase={false}>
                    <Text>Change Cover Photo</Text>
                  </Button>
                </AppUpload>
              )
            }
          />
        </ScrollView>
      </KeyboardAvoidingPageContent>
      <PageActions>
        <ActionButtons onActionClicked={() => savePlaylist()} onCancelClicked={cancelCb} actionLabel="Save" disableAction={!isValid()} />
      </PageActions>
    </PageContainer>
  );

  async function savePlaylist() {
    const dto: CreatePlaylistDto = {
      title,
      description,
      imageSrc,
      category: category,
      tags: tags as any[],
      mediaIds: selected,
    };

    // @ts-ignore TODO: Fix types on dispatch?
    const { payload } = await dispatch(addUserPlaylist(dto));
    const playlistId = payload.playlist._id;
    await dispatch(getUserPlaylists({}));
    await dispatch(getPlaylistById(playlistId));
    editPlaylist(playlistId);
  }

  async function editPlaylist(playlistId) {
    edit({ playlistId });
  }
};

export default withLoadingSpinner(undefined)(withGlobalStateConsumer(PlaylistAdd));
