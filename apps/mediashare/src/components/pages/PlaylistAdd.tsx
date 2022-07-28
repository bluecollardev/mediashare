import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ScrollView, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { withGlobalStateConsumer } from 'mediashare/core/globalState';
import { useRouteWithParams } from 'mediashare/hooks/navigation';
import { routeNames } from 'mediashare/routes';
import { useAppSelector } from 'mediashare/store';
import { findMediaItems } from 'mediashare/store/modules/mediaItems';
import { getPlaylistById, addUserPlaylist } from 'mediashare/store/modules/playlist';
import { getUserPlaylists } from 'mediashare/store/modules/playlists';
import { mapAvailableTags, mapSelectedTagKeysToTagKeyValue } from 'mediashare/store/modules/tags';
import { withLoadingSpinner } from 'mediashare/components/hoc/withLoadingSpinner';
import { titleValidator, descriptionValidator, categoryValidator } from 'mediashare/core/utils/validators';
import {
  PageContainer,
  KeyboardAvoidingPageContent,
  PageActions,
  PageProps,
  ActionButtons,
  MediaCard,
  AppUpload,
  UploadPlaceholder,
} from 'mediashare/components/layout';
import { CreatePlaylistDto, PlaylistCategoryType } from 'mediashare/rxjs-api';
import styles, { theme } from 'mediashare/styles';

// @ts-ignore
const PlaylistAdd = ({ navigation, globalState = { tags: [] } }: PageProps) => {
  const dispatch = useDispatch();

  const author = useAppSelector((state) => state?.user?.entity?.username);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState();
  const [category, setCategory] = useState(PlaylistCategoryType.Free);
  const [isSaved, setIsSaved] = useState(false);
  const [loaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState('');

  const { tags = [] } = globalState;
  const availableTags = useMemo(() => mapAvailableTags(tags).filter((tag) => tag.isPlaylistTag), []);
  const initialTagKeys = [];
  const [selectedTagKeys, setSelectedTagKeys] = useState(initialTagKeys);

  const edit = useRouteWithParams(routeNames.playlistEdit);

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
            description={description}
            showThumbnail={!!imageSrc}
            thumbnail={imageSrc}
            category={category}
            categoryOptions={options}
            onCategoryChange={setCategory as any}
            availableTags={availableTags}
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
                  <Button
                    icon="cloud-upload"
                    mode="outlined"
                    dark
                    color={theme.colors.default}
                    compact
                    uppercase={false}
                    style={styles.changeImageButton}
                    labelStyle={styles.changeImageButtonLabel}
                  >
                    <Text>Change Cover Photo</Text>
                  </Button>
                </AppUpload>
              )
            }
          />
        </ScrollView>
      </KeyboardAvoidingPageContent>
      <PageActions>
        <ActionButtons loading={isSaved} onPrimaryClicked={savePlaylist} onSecondaryClicked={clearAndGoBack} primaryLabel="Save" disablePrimary={!isValid()} />
      </PageActions>
    </PageContainer>
  );

  async function savePlaylist() {
    setIsSaved(true);
    // We only keep track of the tag key, we need to provide a { key, value } pair to to the API
    // Map keys using our tag keys in state... ideally at some point maybe we do this on the server
    const selectedTags = mapSelectedTagKeysToTagKeyValue(selectedTagKeys, availableTags);

    const dto: CreatePlaylistDto = {
      title,
      description,
      imageSrc,
      category: category,
      tags: selectedTags || [],
      mediaIds: [],
    };

    // @ts-ignore TODO: Fix types on dispatch?
    const { payload } = await dispatch(addUserPlaylist(dto));
    const playlistId = payload._id;
    await dispatch(getUserPlaylists());
    await dispatch(getPlaylistById(playlistId));
    setIsSaved(false);
    editPlaylist(playlistId);
  }

  async function editPlaylist(playlistId) {
    edit({ playlistId });
  }

  function resetData() {
    setTitle('');
    setCategory(PlaylistCategoryType.Free);
    setSelectedTagKeys([]);
    // @ts-ignore
    setDescription('');
    setIsLoaded(false);
  }

  function clearAndGoBack() {
    navigation.goBack();
    resetData();
  }
};

export default withLoadingSpinner(undefined)(withGlobalStateConsumer(PlaylistAdd));
