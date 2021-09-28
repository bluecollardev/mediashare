import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../state';
import { deleteMediaItem, updateMediaItem } from '../../state/modules/media-items';

import { CreateMediaItemDtoCategoryEnum, UpdateMediaItemDto } from '../../rxjs-api';
import { useMediaItems } from '../../hooks/NavigationHooks';

import { withLoadingSpinner } from '../hoc/withLoadingSpinner';

import { Button, Paragraph } from 'react-native-paper';
import { View } from 'react-native';

import { ActionButtons } from '../layout/ActionButtons';
import { MediaCard } from '../layout/MediaCard';
import { PageContainer, KeyboardAvoidingPageContent, PageActions, PageProps } from '../layout/PageContainer';
import AppDialog from '../layout/AppDialog';

import { theme } from '../../styles';
import AppUpload from '../layout/AppUpload';

export interface MediaItemEditContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
}

export interface MediaItemEditContainerState {}

const MediaItemEdit = ({ navigation, route, startLoad, endLoad }: PageProps) => {
  const actionLabel = 'Save';
  const cancelLabel = 'Cancel';
  const options = [];
  for (const value in CreateMediaItemDtoCategoryEnum) {
    options.push(value);
  }

  const dispatch = useDispatch();

  const { mediaId } = route?.params || {};
  const mediaItem = useAppSelector((state) => state.mediaItem.mediaItem);

  const [title, setTitle] = useState(mediaItem?.title);
  const [description, setDescription] = useState(mediaItem?.description);
  const [category, setCategory] = useState();
  const [showDialog, setShowDialog] = useState(false);

  const [documentUri] = useState(mediaItem?.uri);
  const [thumbnail, setThumbnail] = useState(mediaItem?.thumbnail);

  const mediaItems = useMediaItems();

  const resetData = () => {};
  const cancelCb = () => {
    navigation.goBack();
    resetData();
  };
  const saveItem = async function () {
    const dto: UpdateMediaItemDto & { _id } = {
      title,
      category: CreateMediaItemDtoCategoryEnum[category as any],
      description,
      isPlayable: true,
      thumbnail,
      _id: mediaId,
    };

    await dispatch(updateMediaItem(dto));
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
  // @ts-ignore
  return (
    <PageContainer>
      <KeyboardAvoidingPageContent>
        <AppDialog
          leftActionLabel={'Cancel'}
          rightActionLabel={'Delete'}
          leftActionCb={() => setShowDialog(false)}
          rightActionCb={() => deleteItem()}
          onDismiss={() => setShowDialog(false)}
          showDialog={showDialog}
          title={'Delete Media Item'}
          subtitle={'Are you sure you want to do this? This action is final and cannot be undone.'}
        />
        <MediaCard
          title={title}
          description={description}
          mediaSrc={documentUri}
          thumbnail={thumbnail}
          showThumbnail={true}
          category={category}
          categoryOptions={options}
          onCategoryChange={(e: any) => {
            setCategory(e);
          }}
          onTitleChange={setTitle}
          onDescriptionChange={setDescription}
          isEdit={true}
          isPlayable={true}
          topDrawer={() => (
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <Button icon="delete" mode="text" dark color={theme.colors.error} onPress={() => setShowDialog(true)} compact>
                  {' '}
                </Button>
              </View>
              <View style={{ flex: 4 }}>
                <AppUpload startLoad={startLoad} endLoad={endLoad} onUpload={setThumbnail}>
                  <Button icon="cloud-upload" mode="outlined" dark color={theme.colors.accentDarker} compact>
                    Change Preview Image
                  </Button>
                </AppUpload>
              </View>
            </View>
          )}
        />
      </KeyboardAvoidingPageContent>
      <PageActions>
        <ActionButtons actionCb={saveItem} cancelCb={cancelCb} rightIcon="check-circle" actionLabel={actionLabel} cancelLabel={cancelLabel} />
      </PageActions>
    </PageContainer>
  );

  async function deleteItem() {
    console.log('deleting');
    await dispatch(deleteMediaItem({ id: mediaId, key: mediaItem.uri }));
    mediaItems();
  }
};

export default withLoadingSpinner(MediaItemEdit);
