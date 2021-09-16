import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { ROUTES } from '../../routes';

import { useAppSelector } from '../../state';
import { getPlaylistById, removeUserPlaylist } from '../../state/modules/playlists';

import { usePlaylists, useRouteWithParams, useViewMediaItem } from '../../hooks/NavigationHooks';

import { withLoadingSpinner } from '../hoc/withLoadingSpinner';

import { FAB } from 'react-native-paper';

import { PlaylistCard } from '../layout/PlaylistCard';
import { MediaList } from '../layout/MediaList';
import { ListActionButton } from '../layout/ListActionButton';
import { PageContainer, PageContent, PageActions, PageProps } from '../layout/PageContainer';

import { theme } from '../../styles';
import AppDialog from '../layout/AppDialog';

export const PlaylistDetail = ({ route, onDataLoaded }: PageProps) => {
  const { playlistId = '' } = route?.params || {};

  const onEditClicked = useRouteWithParams(ROUTES.playlistEdit);
  const onAddToPlaylistClicked = useRouteWithParams(ROUTES.addItemsToPlaylist);
  const onViewMediaItem = useViewMediaItem();
  const playlists = usePlaylists();
  const onDelete = async ({ playlistId }) => {
    console.log('dispatch', playlistId);
    await dispatch(removeUserPlaylist(playlistId));
    playlists();
  };

  const dispatch = useDispatch();

  const selectedPlaylist = useAppSelector((state) => state.playlist.selectedPlaylist);
  const loaded = useAppSelector((state) => state);
  const [showDialog, setShowDialog] = useState(false);
  const [isLoaded, setIsLoaded] = useState(!!loaded);

  useEffect(() => {
    if (!isLoaded) {
      loadData().then(onDataLoaded);
      console.log(selectedPlaylist);
    }
  }, [isLoaded, dispatch, onDataLoaded, loaded, selectedPlaylist]);

  const [fabState, setFabState] = useState({ open: false });
  const fabActions = [
    { icon: 'delete', onPress: () => setShowDialog(true), color: theme.colors.primaryTextLighter, style: { backgroundColor: theme.colors.error } },
    { icon: 'edit', onPress: () => onEditClicked({ playlistId }), color: theme.colors.primaryTextLighter, style: { backgroundColor: theme.colors.primary } },
    {
      icon: 'playlist-add',
      onPress: () => onAddToPlaylistClicked({ playlistId }),
      color: theme.colors.primaryTextLighter,
      style: { backgroundColor: theme.colors.primary },
    },
  ];

  const { description = '', title = '', user, category, mediaItems = [] } = selectedPlaylist || {};

  const items = mediaItems;
  const author = user?.username;

  return (
    <>
      <PageContainer>
        <PageContent>
          <AppDialog
            leftActionLabel={'Cancel'}
            rightActionLabel={'Delete'}
            leftActionCb={() => setShowDialog(false)}
            rightActionCb={() => onDelete({ playlistId })}
            onDismiss={() => setShowDialog(false)}
            showDialog={showDialog}
            title={'Are you sure?'}
            subtitle={'This action cannot be undone'}
          />
          <PlaylistCard
            title={title}
            author={author}
            description={description}
            showSocial={true}
            showActions={false}
            showThumbnail={true}
            onEditClicked={() => onEditClicked({ playlistId })}
            // onDeleteClicked={onDeleteClicked}
            category={category}
          />
          <MediaList onViewDetail={(item) => onViewMediaItem({ mediaId: item._id, uri: item.uri })} list={items} isSelectable={false} showThumbnail={true} />
        </PageContent>
        <PageActions>
          <ListActionButton icon="playlist-add" label="Add From Collection" actionCb={() => onAddToPlaylistClicked({ playlistId })} />
        </PageActions>
        <FAB.Group
          visible={true}
          open={fabState.open}
          icon={fabState.open ? 'close' : 'more-vert'}
          actions={fabActions}
          color={theme.colors.primaryTextLighter}
          fabStyle={{ backgroundColor: fabState.open ? theme.colors.error : theme.colors.primary }}
          onStateChange={(open) => {
            // open && setOpen(!open);
            setFabState(open);
          }}
          // onPress={() => setOpen(!open)}
        />
      </PageContainer>
    </>
  );

  async function loadData() {
    await dispatch(getPlaylistById(playlistId));
    setIsLoaded(true);
  }
};

export default withLoadingSpinner(PlaylistDetail);
