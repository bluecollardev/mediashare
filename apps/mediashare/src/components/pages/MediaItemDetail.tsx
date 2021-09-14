import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../state';
import { getMediaItemById } from '../../state/modules/media-items';

import { useSpinner } from '../../hooks/useSpinner';
import { useRouteWithParams } from '../../hooks/NavigationHooks';
import { ROUTES } from '../../routes';

import { ScrollView, View } from 'react-native';
import { FAB } from 'react-native-paper';
import { PageContainer } from '../layout/PageContainer';
import { MediaItemCard } from '../layout/MediaItemCard';

import { theme } from '../../styles';
import { findUserPlaylists } from '../../state/modules/playlists';

export interface MediaItemDetailContainerProps {
  navigation: any;
  route: any;
  data: Object;
  state: Object;
  mediaId: string | number; // TODO: Make a type
}

export interface MediaItemDetailContainerState {}

const MediaItemDetail = ({ route }) => {
  const dispatch = useDispatch();

  const { mediaId, uri } = route?.params || {};
  const { mediaItem, loading, loaded } = useAppSelector((state) => state.mediaItem);

  const [isLoaded, setIsLoaded] = useState(loaded);

  const mediaItemSrc = useAppSelector((state) => state.mediaItem.mediaSrc);
  const { _id } = mediaItem || {};

  const onEditClicked = useRouteWithParams(ROUTES.mediaItemEdit);
  const onDeleteClicked = () => {};

  const [fabState, setState] = useState({ open: false });

  const fabActions = [
    { icon: 'delete', onPress: () => onDeleteClicked(), color: theme.colors.primaryTextLighter, style: { backgroundColor: theme.colors.error } },
    { icon: 'edit', onPress: () => onEditClicked({ mediaId }), color: theme.colors.primaryTextLighter, style: { backgroundColor: theme.colors.primary } },
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

  return (
    <PageContainer>
      <ScrollView>
        <View>
          <MediaItemCard
            title={title}
            description={description}
            image={mediaItemSrc}
            showActions={true}
            category={category}
            onEditClicked={() => onEditClicked({ mediaId })}
            onDeleteClicked={onDeleteClicked}
            author={author}
          />
        </View>
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
      </ScrollView>
    </PageContainer>
  );
};

export default MediaItemDetail;
