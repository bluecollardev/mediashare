import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { ROUTES } from '../../routes';

import { getUserPlaylists, findPlaylists, selectPlaylistAction } from '../../store/modules/playlists';

import { PlaylistResponseDto } from '../../rxjs-api';

import { withGlobalStateConsumer } from '../../core/globalState';

import { useLoadPlaylistData } from '../../hooks/useLoadData';
import { useRouteName, useViewPlaylistById } from '../../hooks/NavigationHooks';
import { withLoadingSpinner } from '../hoc/withLoadingSpinner';

import { FAB, Text, Divider } from 'react-native-paper';
import { RefreshControl, StyleSheet } from 'react-native';
import { View } from 'react-native';

import { PageActions, PageContainer, KeyboardAvoidingPageContent, PageProps } from '../layout/PageContainer';
import { MediaListItem } from '../layout/MediaListItem';
import { ActionButtons } from '../layout/ActionButtons';
import { NoItems } from '../layout/NoItems';

import { getAuthorText, getUsername, shortenText } from '../../utils';
import { createRandomRenderKey } from '../../core/utils';

import { theme } from '../../styles';

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

export const PlaylistsComponent = ({
  list = [],
  onViewDetailClicked,
  selectable = false,
  showActions = true,
  onChecked = () => undefined
}: PlaylistsProps) => {
  const sortedList = list.map((item) => item);
  sortedList.sort((dtoA, dtoB) => (dtoA.title > dtoB.title ? 1 : -1));

  return (
    <View>
      {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
      {sortedList.map((item, idx) => {
        const { title, author, description, mediaIds = [], imageSrc } = item;
        // console.log(`Dumping playlist item: ${JSON.stringify(item, null, 2)}`);
        return (
          <View key={`playlists_item_${item._id}`}>
            <MediaListItem
              key={`playlist_${item._id}`}
              title={title}
              titleStyle={styles.title}
              description={() => (
                <>
                  {/* <Text style={styles.author}>By {getAuthorText(creator)}</Text> */}
                  {author && <Text style={styles.username}>By @{author}</Text>}
                  <Text style={styles.description}>{shortenText(description, 52)}</Text>
                  <Text style={styles.videoCount}>{mediaIds?.length || 0} videos</Text>
                </>
              )}
              showThumbnail={true}
              image={imageSrc}
              showActions={showActions}
              selectable={selectable}
              onViewDetail={() => onViewDetailClicked(item)}
              onChecked={(checked) => onChecked(checked, item)}
            />
            <Divider key={`playlist_divider_${item._id}`} />
          </View>
        );
      })}
    </View>
  );
};

const actionModes = { share: 'share', delete: 'delete', default: 'default' };

export const Playlists = ({ globalState }: PageProps) => {
  // console.log(`Playlists > Dump current search filters: ${JSON.stringify(globalState?.search, null, 2)}`);

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
  const [prevSearchFilters, setPrevSearchFilters] = useState({ filters: { text: '' } });
  useEffect(() => {
    const currentSearchFilters = globalState?.search;
    if (!isLoaded || currentSearchFilters !== prevSearchFilters) {
      setPrevSearchFilters(currentSearchFilters);
      loadData();
    }
  }, [isLoaded, globalState]);

  const [fabState, setFabState] = useState({ open: false });
  const fabActions = [
    { icon: 'delete-forever', onPress: () => activateDeleteMode(), color: theme.colors.text, style: { backgroundColor: theme.colors.error } },
    { icon: 'share', onPress: () => activateShareMode(), color: theme.colors.text, style: { backgroundColor: theme.colors.primary } },
    { icon: 'library-add', onPress: () => createPlaylist(), color: theme.colors.text, style: { backgroundColor: theme.colors.accent } },
  ];

  const [clearSelectionKey, setClearSelectionKey] = useState(createRandomRenderKey());
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
          color={theme.colors.text}
          fabStyle={{ backgroundColor: fabState.open ? theme.colors.default : theme.colors.primary }}
          onStateChange={(open) => {
            setFabState(open);
          }}
        />
      )}
    </PageContainer>
  );

  async function loadData() {
    const { search } = globalState;
    const args = { text: search?.filters?.text ? search.filters.text : '' };
    // console.log(`Playlists.loadData > Dispatch with args: ${JSON.stringify(args, null, 2)}`);
    // console.log(globalState);
    if (search.filters.text) {
      // console.log('Dispatch findPlaylists');
      await dispatch(findPlaylists(args));
    } else {
      // console.log('Dispatch getUserPlaylists');
      await dispatch(getUserPlaylists({}));
    }
    setIsLoaded(true);
  }

  async function refresh() {
    setRefreshing(true);
    const { search } = globalState;
    const args = { text: search?.filters?.text ? search.filters.text : '' };
    // console.log(`Playlists.refresh > Dispatch with args: ${JSON.stringify(args, null, 2)}`);
    // console.log(globalState);
    if (search.filters.text) {
      // console.log('Dispatch findPlaylists');
      await dispatch(findPlaylists(args));
    } else {
      // console.log('Dispatch getUserPlaylists');
      await dispatch(getUserPlaylists({}));
    }
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
    const randomKey = createRandomRenderKey();
    setClearSelectionKey(randomKey);
  }
};

export default withLoadingSpinner(withGlobalStateConsumer(Playlists));

const styles = StyleSheet.create({
  title: {
    marginBottom: 2,
  },
  author: {
    color: theme.colors.textDarker,
    fontSize: 12,
    marginBottom: 2,
  },
  username: {
    color: theme.colors.primary,
    fontSize: 12,
    marginBottom: 4,
  },
  description: {
    color: theme.colors.textDarker,
    fontSize: 12,
    marginTop: 2,
    marginBottom: 4,
  },
  videoCount: {
    color: theme.colors.textDarker,
    fontSize: 12,
    marginBottom: 2,
    fontWeight: 'bold',
  },
});
