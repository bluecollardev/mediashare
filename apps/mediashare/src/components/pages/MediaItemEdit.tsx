import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../state';
import { deleteMediaItem, updateMediaItem } from '../../state/modules/media-items';

import { CreateMediaItemDtoCategoryEnum, CreatePlaylistDtoCategoryEnum, UpdateMediaItemDto } from '../../rxjs-api';
import { useMediaItems } from '../../hooks/NavigationHooks';

import { View, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import { ActionButtons } from '../layout/ActionButtons';
import { MediaCard } from '../layout/MediaCard';
import { PageContainer, PageProps } from '../layout/PageContainer';

import styles, { theme } from '../../styles';
import { Avatar, Card, Dialog, FAB, Paragraph, Portal, Button } from 'react-native-paper';
import { withLoadingSpinner } from '../hoc/withLoadingSpinner';
import AppDialog from '../layout/AppDialog';

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

  const { mediaId, uri } = route?.params || {};
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
      <View style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
          <FAB
            color={theme.colors.primaryTextLighter}
            style={{ backgroundColor: theme.colors.error, position: 'absolute', right: 15, bottom: 15 }}
            icon={'delete'}
            onPress={() => setShowDialog(true)}
          />
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
          {/* <Portal>
            <Dialog visible={showDialog} onDismiss={() => setShowDialog(false)}>
              <Card.Title
                title={'Are you sure you wante to delete?'}
                subtitle={'This action is not reversable'}
                left={(props) => (
                  <Avatar.Icon color={theme.colors.primaryTextLighter} style={{ backgroundColor: theme.colors.error }} {...props} icon="warning" />
                )}
              />
              <Dialog.Actions style={{ paddingTop: 0 }}>
                <Button mode={'text'} color={theme.colors.primaryText} onPress={() => setShowDialog(false)}>
                  Cancel
                </Button>
                <Button mode={'contained'} dark color={theme.colors.error} onPress={() => onDelete()}>
                  Confirm
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal> */}
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
          </TouchableWithoutFeedback>
          <View>
            <ActionButtons actionCb={saveItem} cancelCb={cancelCb} rightIcon="check-circle" actionLabel={actionLabel} cancelLabel={cancelLabel} />
          </View>
        </KeyboardAvoidingView>
      </View>
    </PageContainer>
  );
};

export default withLoadingSpinner(MediaItemEdit);
