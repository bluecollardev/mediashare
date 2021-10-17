import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { ROUTES } from '../../routes';

import { findUserPlaylists, selectPlaylistAction } from '../../state/modules/playlists';

import { PlaylistResponseDto } from '../../rxjs-api';

import { useLoadPlaylistData } from '../../hooks/useLoadData';
import { useRouteName, useViewPlaylistById } from '../../hooks/NavigationHooks';
import { withLoadingSpinner } from '../hoc/withLoadingSpinner';

import { FAB, Text } from 'react-native-paper';
import { RefreshControl, StyleSheet } from 'react-native';

import { View } from 'react-native';
import { MediaListItem } from '../layout/MediaListItem';
import { PageActions, PageContainer, KeyboardAvoidingPageContent, PageProps } from '../layout/PageContainer';

import { getAuthorText, getUsername, shortenText } from '../../utils';

import { theme } from '../../styles';
import { ActionButtons } from '../layout/ActionButtons';
import { NoItems } from '../layout/NoItems';

export interface PlaylistsProps {
  list: PlaylistResponseDto[];
  selectable?: boolean;
  clearSelection?: boolean;
  showActions?: boolean;
  onViewDetailClicked?: Function;
  onChecked?: (checked: boolean, item?: any) => void;
}

/* export function mapPlaylists(playlist: PlaylistResponseDto[]) {
  const list = playlist.map((item) => {
    const keyed = {
      id: item._id,
      title: item.title,
      description: `${item?.mediaItems?.length || 0} Videos`,
      key: item._id,
      ...item,
    };
    return keyed;
  });
  return list;
} */

export const PlaylistsComponent = ({ list = [], onViewDetailClicked, selectable = false, showActions = true, onChecked = () => {} }: PlaylistsProps) => {
  const sortedList = list.map((item) => item);
  sortedList.sort((dtoA, dtoB) => (dtoA.title > dtoB.title ? 1 : -1));

  return (
    <View>
      {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
      {sortedList.map((item, idx) => {
        const { title, author, description, mediaIds, imageSrc } = item;
        return (
          <MediaListItem
            key={item._id}
            title={title}
            description={
              <View>
                {/* <Text style={styles.author}>By {getAuthorText(creator)}</Text> */}
                {author && <Text style={styles.username}>By @{author}</Text>}
                <Text style={styles.description}>{shortenText(description, 40)}</Text>
                <Text style={styles.videoCount}>{mediaIds.length || 0} videos</Text>
              </View>
            }
            showThumbnail={true}
            image={imageSrc}
            showActions={showActions}
            selectable={selectable}
            onViewDetail={() => {
              onViewDetailClicked(item);
            }}
            onChecked={(checked) => onChecked(checked, item)}
          />
        );
      })}
    </View>
  );
};

const actionModes = { share: 'share', delete: 'delete', default: 'default' };

export const Playlists = ({}: PageProps) => {
  const shareWith = useRouteName(ROUTES.shareWith);
  const createPlaylist = useRouteName(ROUTES.playlistAdd);
  const viewPlaylist = useViewPlaylistById();

  const dispatch = useDispatch();

  const [{ state, loaded }] = useLoadPlaylistData();
  const [isLoaded, setIsLoaded] = useState(loaded);
  const [isSelectable, setIsSelectable] = useState(false);
  const [actionMode, setActionMode] = useState(actionModes.default);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(refresh, [dispatch]);
  useEffect(() => {
    if (!isLoaded) {
      loadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, dispatch]);

  const [fabState, setFabState] = useState({ open: false });
  const fabActions = [
    { icon: 'delete', onPress: () => activateDeleteMode(), color: theme.colors.primaryTextLighter, style: { backgroundColor: theme.colors.disabled } },
    { icon: 'share', onPress: () => activateShareMode(), color: theme.colors.primaryTextLighter, style: { backgroundColor: theme.colors.primaryDarker } },
    { icon: 'library-add', onPress: () => createPlaylist(), color: theme.colors.primaryTextLighter, style: { backgroundColor: theme.colors.accent } },
  ];

  const [clearSelectionKey, setClearSelectionKey] = useState(Math.random());
  useEffect(() => {
    clearCheckboxSelection();
  }, []);

  const { entities = [] } = state?.userPlaylists;

  return (
    <PageContainer>
      <KeyboardAvoidingPageContent refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {loaded && entities.length > 0 ? (
          <PlaylistsComponent
            key={clearSelectionKey}
            list={entities}
            onViewDetailClicked={(item) => viewPlaylist({ playlistId: item._id })}
            selectable={isSelectable}
            showActions={!isSelectable}
            onChecked={updateSelection}
          />
        ) : (
          <NoItems />
        )}
      </KeyboardAvoidingPageContent>
      {isSelectable && actionMode === actionModes.share && (
        <PageActions>
          <ActionButtons actionCb={confirmPlaylistsToShare} cancelCb={cancelPlaylistsToShare} actionLabel="Share With" cancelLabel="Cancel" rightIcon="group" />
        </PageActions>
      )}
      {isSelectable && actionMode === actionModes.delete && (
        <PageActions>
          <ActionButtons actionCb={confirmPlaylistsToDelete} cancelCb={cancelPlaylistsToDelete} actionLabel="Delete" cancelLabel="Cancel" rightIcon="delete" />
        </PageActions>
      )}
      {!isSelectable && (
        <FAB.Group
          visible={true}
          open={fabState.open}
          icon={fabState.open ? 'close' : 'more-vert'}
          actions={fabActions}
          color={theme.colors.primaryTextLighter}
          fabStyle={{ backgroundColor: fabState.open ? theme.colors.error : theme.colors.primary }}
          onStateChange={(open) => {
            setFabState(open);
          }}
        />
      )}
    </PageContainer>
  );

  async function loadData() {
    await dispatch(findUserPlaylists({}));
    setIsLoaded(true);
  }

  async function refresh() {
    setRefreshing(true);
    await dispatch(findUserPlaylists({}));
    setRefreshing(false);
  }

  async function updateSelection(bool, item) {
    dispatch(selectPlaylistAction({ isChecked: bool, plist: item }));
  }

  async function activateShareMode() {
    setActionMode(actionModes.share);
    setIsSelectable(true);
  }

  async function confirmPlaylistsToShare() {
    setActionMode(actionModes.default);
    clearCheckboxSelection();
    setIsSelectable(false);
    shareWith();
  }

  async function cancelPlaylistsToShare() {
    setActionMode(actionModes.default);
    clearCheckboxSelection();
    setIsSelectable(false);
  }

  async function activateDeleteMode() {
    setActionMode(actionModes.delete);
    setIsSelectable(true);
  }

  async function confirmPlaylistsToDelete() {
    setActionMode(actionModes.default);
    clearCheckboxSelection();
    setIsSelectable(false);
  }

  async function cancelPlaylistsToDelete() {
    setActionMode(actionModes.default);
    clearCheckboxSelection();
    setIsSelectable(false);
  }

  function clearCheckboxSelection() {
    const randomKey = Math.random();
    setClearSelectionKey(randomKey);
  }
};

export default withLoadingSpinner(Playlists);

const styles = StyleSheet.create({
  author: {
    color: '#666',
    fontSize: 12,
    marginBottom: 2,
  },
  username: {
    color: theme.colors.primary,
    fontSize: 12,
    marginBottom: 4,
  },
  description: {
    color: '#666666',
    fontSize: 12,
    marginTop: 2,
    marginBottom: 4,
  },
  videoCount: {
    color: '#666666',
    fontSize: 12,
    marginBottom: 2,
    fontWeight: 'bold',
  },
});
