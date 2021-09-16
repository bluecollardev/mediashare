import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../state';
import { getMediaItemById } from '../../state/modules/media-items';

import { withLoadingSpinner } from '../hoc/withLoadingSpinner';

import { FAB } from 'react-native-paper';
import { MediaItemCard } from '../layout/MediaItemCard';
import { PageContainer, PageContent, PageProps } from '../layout/PageContainer';

import { theme } from '../../styles';

const PlaylistItemDetail = ({ route }: PageProps) => {
  const dispatch = useDispatch();

  const { mediaId, uri } = route?.params || {};
  const { mediaItem, loading, loaded } = useAppSelector((state) => state.mediaItem);

  const [isLoaded, setIsLoaded] = useState(loaded);

  const mediaItemSrc = useAppSelector((state) => state.mediaItem.mediaSrc);
  const { _id } = mediaItem || {};

  const onDeleteClicked = () => {};

  const [fabState, setState] = useState({ open: false });

  const fabActions = [
    { icon: 'delete', onPress: () => onDeleteClicked(), color: theme.colors.primaryTextLighter, style: { backgroundColor: theme.colors.primary } },
  ];

  useEffect(() => {
    async function loadData() {
      dispatch(getMediaItemById({ uri, mediaId }));

      setIsLoaded(true);
    }
    if (!isLoaded || _id !== mediaId) {
      loadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isLoaded, uri, mediaId, _id]);

  const { title, description, category, author } = mediaItem || {};

  useEffect(() => {
    if (!loaded) {
      // loadData().then(() => setIsLoaded(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  return (
    <PageContainer>
      <PageContent>
        <MediaItemCard title={title} description={description} image={mediaItemSrc} showActions={false} category={category} author={author} />
      </PageContent>
      <FAB.Group
        visible={true}
        open={fabState.open}
        icon={fabState.open ? 'close' : 'more-vert'}
        actions={fabActions}
        color={theme.colors.primaryTextLighter}
        fabStyle={{ backgroundColor: fabState.open ? theme.colors.error : theme.colors.primary }}
        onStateChange={(open) => {
          // open && setOpen(!open);
          setState(open);
        }}
        // onPress={() => setOpen(!open)}
      />
    </PageContainer>
  );
};

export default withLoadingSpinner(PlaylistItemDetail);
