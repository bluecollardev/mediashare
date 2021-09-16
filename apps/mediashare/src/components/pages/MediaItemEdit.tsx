import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../state';
import { deleteMediaItem, updateMediaItem } from '../../state/modules/media-items';

import { CreateMediaItemDtoCategoryEnum, CreatePlaylistDtoCategoryEnum, UpdateMediaItemDto } from '../../rxjs-api';
import { useMediaItems } from '../../hooks/NavigationHooks';

import { withLoadingSpinner } from '../hoc/withLoadingSpinner';

import { FAB, Paragraph } from 'react-native-paper';
import { ActionButtons } from '../layout/ActionButtons';
import { MediaCard } from '../layout/MediaCard';
import { PageContainer, KeyboardAvoidingPageContent, PageActions, PageProps } from '../layout/PageContainer';
import AppDialog from '../layout/AppDialog';

import { theme } from '../../styles';

export interface MediaItemEditContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
}

export interface MediaItemEditContainerState {}

const MediaItemEdit = ({ navigation, route }: PageProps) => {
  const actionLabel = 'Save';
  const cancelLabel = 'Cancel';
  const options = [];
  for (const value in CreateMediaItemDtoCategoryEnum) {
    options.push(value);
  }

  const dispatch = useDispatch();

  const { mediaId } = route?.params || {};
  const mediaItem = useAppSelector((state) => state.mediaItem.mediaItem);

  const mediaItemSrc = useAppSelector((state) => state.mediaItem.mediaSrc);

  const [title, setTitle] = useState(mediaItem?.title);
  const [description, setDescription] = useState(mediaItem?.description);
  const [category, setCategory] = useState();
  const [showDialog, setShowDialog] = useState(false);

  const mediaItems = useMediaItems();

  const resetData = () => {};
  const cancelCb = () => {
    navigation.goBack();
    resetData();
  };
  const saveItem = async function () {
    const dto: UpdateMediaItemDto & { _id } = {
      title,
      category: CreatePlaylistDtoCategoryEnum[category as any],
      description,
      isPlayable: true,
      _id: mediaId,
    };

    await dispatch(updateMediaItem(dto));
    mediaItems();
  };
  const onDelete = async function () {
    console.log('deleting');
    await dispatch(deleteMediaItem({ id: mediaId, key: mediaItem.uri }));
    mediaItems();
  };

  useEffect(() => {
    if (mediaItem) {
      setTitle(mediaItem?.title);
      setDescription(mediaItem?.description);
      setCategory(mediaItem?.category as any);
    }
  }, [mediaItem]);
  if (!mediaItem) {
    return <Paragraph>Loading</Paragraph>;
  }
  return (
    <PageContainer>
      <KeyboardAvoidingPageContent>
        <AppDialog
          leftActionLabel={'Cancel'}
          rightActionLabel={'Delete'}
          leftActionCb={() => setShowDialog(false)}
          rightActionCb={() => onDelete()}
          onDismiss={() => setShowDialog(false)}
          showDialog={showDialog}
          title={'Are you sure?'}
          subtitle={'This action cannot be undone'}
        />
        <MediaCard
          title={title}
          description={description}
          mediaSrc={mediaItemSrc}
          category={category}
          categoryOptions={options}
          onCategoryChange={(e: any) => {
            setCategory(e);
          }}
          onTitleChange={setTitle}
          onDescriptionChange={setDescription}
          isEdit={true}
        />
      </KeyboardAvoidingPageContent>
      <PageActions>
        <ActionButtons actionCb={saveItem} cancelCb={cancelCb} rightIcon="check-circle" actionLabel={actionLabel} cancelLabel={cancelLabel} />
      </PageActions>
      <FAB
        color={theme.colors.primaryTextLighter}
        style={{ backgroundColor: theme.colors.error, position: 'absolute', right: 15, bottom: 15 }}
        icon={'delete'}
        onPress={() => setShowDialog(true)}
      />
    </PageContainer>
  );
};

export default withLoadingSpinner(MediaItemEdit);
