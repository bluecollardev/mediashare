import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ScrollView } from 'react-native';
import { withGlobalStateConsumer } from 'mediashare/core/globalState';
import { routeNames } from 'mediashare/routes';
import { useAppSelector } from 'mediashare/store';
import { getPlaylistById, removeUserPlaylist } from 'mediashare/store/modules/playlist';
import { getUserPlaylists, selectPlaylist } from 'mediashare/store/modules/playlists';
import { loadUsers } from 'mediashare/store/modules/users';
import { mapAvailableTags } from 'mediashare/store/modules/tags';
import { usePlaylists, useRouteName, useRouteWithParams, useViewMediaItem } from 'mediashare/hooks/NavigationHooks';
import { withLoadingSpinner } from 'mediashare/components/hoc/withLoadingSpinner';
import { FAB } from 'react-native-paper';
import { PageContainer, PageContent, PageActions, PageProps, ActionButtons, AppDialog, MediaCard, MediaList } from 'mediashare/components/layout';
import { PlaylistResponseDto } from 'mediashare/rxjs-api';
import * as build from 'mediashare/build';
import { theme } from 'mediashare/styles';

// @ts-ignore
export const PlaylistDetail = ({ route, globalState = { tags: [] } }: PageProps) => {
  const dispatch = useDispatch();

  const { playlistId = '' } = route?.params || {};

  const edit = useRouteWithParams(routeNames.playlistEdit);
  const addToPlaylist = useRouteWithParams(routeNames.addItemsToPlaylist);
  const viewMediaItem = useViewMediaItem();
  const goToShareWith = useRouteName(routeNames.shareWith);
  const goToPlaylists = usePlaylists();
  const playFromBeginning = useViewMediaItem();

  const { loaded, selected } = useAppSelector((state) => state?.playlist);
  const [isLoaded, setIsLoaded] = useState(loaded);

  const appUserId = useAppSelector((state) => state?.user?.entity?._id);
  // @ts-ignore
  const {
    _id,
    title = '',
    author = '',
    createdBy,
    description = '',
    imageSrc,
    category,
    shareCount = 0,
    viewCount = 0,
    likesCount = 0,
    mediaItems = [],
  } = selected || {};
  const items = mediaItems || [];
  const allowEdit = createdBy === appUserId;

  const { tags = [] } = globalState;
  const tagKeys = (selected?.tags || []).map(({ key }) => key);
  const mappedTags = useMemo(() => mapAvailableTags(tags).filter((tag) => tag.isPlaylistTag), []);

  useEffect(() => {
    if (!isLoaded) {
      loadData().then();
    }
  }, [isLoaded]);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const [fabState, setFabState] = useState({ open: false });
  let fabActions;
  if (allowEdit) {
    fabActions = [
      { icon: 'delete-forever', onPress: () => setShowDeleteDialog(true), color: theme.colors.text, style: { backgroundColor: theme.colors.error } },
      { icon: 'share', onPress: () => sharePlaylist(), color: theme.colors.text, style: { backgroundColor: theme.colors.primary } },
      { icon: 'edit', onPress: () => editPlaylist(), color: theme.colors.text, style: { backgroundColor: theme.colors.accent } },
    ];
  } else {
    fabActions = [{ icon: 'share', onPress: () => sharePlaylist(), color: theme.colors.text, style: { backgroundColor: theme.colors.accent } }];
  }

  // Don't display anything unless we have a selected playlist
  // TODO: Show loader!
  if (!selected) {
    return null;
  }

  return (
    <PageContainer>
      <PageContent>
        <AppDialog
          leftActionLabel="Cancel"
          rightActionLabel="Delete"
          leftActionCb={() => setShowDeleteDialog(false)}
          rightActionCb={() => deletePlaylist()}
          onDismiss={() => setShowDeleteDialog(false)}
          showDialog={showDeleteDialog}
          title="Delete Playlist"
          subtitle="Are you sure you want to do this? This action is final and cannot be undone."
        />
        <ScrollView>
          <MediaCard
            key={_id}
            title={title}
            author={author}
            description={description}
            thumbnail={imageSrc}
            showThumbnail={true}
            category={category}
            availableTags={mappedTags}
            tags={tagKeys}
            showSocial={true}
            showActions={false}
            likes={likesCount}
            shares={shareCount}
            views={viewCount}
          >
            {/* TODO: Make this work and add it back in! */}
            {/* <Button
                icon="live-tv"
                color={theme.colors.default}
                mode="outlined"
                styles={{ width: '100%', marginTop: 25, marginBottom: 25 }}
                compact
                dark
                onPress={() => (items && items.length > 0 ? viewMediaItem({ mediaId: items[0]._id, uri: items[0].uri }) : undefined)}
              >
                Play From Beginning
              </Button>
              <Divider /> */}
            {!allowEdit && mediaItems.length > 0 && (
              <ActionButtons
                containerStyles={{ marginHorizontal: 0, marginVertical: 15 }}
                showCancel={false}
                showAction={true}
                onActionClicked={async () => {
                  playFromBeginning({ mediaId: mediaItems[0]._id, uri: mediaItems[0].uri })
                }}
                actionLabel="Play from Beginning"
                actionIcon="live-tv"
              />
            )}
            {!build.forFreeUser && allowEdit && (
              <ActionButtons
                containerStyles={{ marginHorizontal: 0, marginVertical: 15 }}
                showCancel={false}
                cancelIcon="rule"
                actionLabel="Add To Playlist"
                actionIcon="playlist-add"
                onActionClicked={() => addToPlaylist({ playlistId })}
              />
            )}
            <MediaList
              onViewDetail={(item) => viewMediaItem({ mediaId: item._id, uri: item.uri })}
              list={items}
              showThumbnail={true}
              // TODO: This is disabled on purpose I'm thinking we don't want to manage items in multiple places just yet!
              selectable={false}
            />
          </MediaCard>
        </ScrollView>
      </PageContent>
      <PageActions>
        {/* TODO: Selectively display depending if the user has scrolled up past the upper button */}
        {/*!build.forFreeUser && allowEdit && (!selectedItems || selectedItems.length === 0) && (
          <ListActionButton icon="playlist-add" label="Add To Playlist" onActionClicked={() => addToPlaylist({ playlistId })} />
        )*/}
      </PageActions>
      {!build.forFreeUser && (
        <FAB.Group
          visible={true}
          open={fabState.open}
          icon={fabState.open ? 'close' : 'more-vert'}
          actions={fabActions}
          color={theme.colors.text}
          fabStyle={{ backgroundColor: fabState.open ? theme.colors.default : theme.colors.primary }}
          onStateChange={(open) => {
            // open && setOpen(!open);
            setFabState(open);
          }}
          onPress={() => undefined}
        />
      )}
    </PageContainer>
  );

  async function loadData() {
    await dispatch(getPlaylistById(playlistId));
    await dispatch(loadUsers());
    setIsLoaded(true);
  }

  async function sharePlaylist() {
    await dispatch(selectPlaylist({ isChecked: true, plist: selected as PlaylistResponseDto }));
    goToShareWith();
  }

  // TODO: This is unused! Implement or remove ASAP!
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function cancelSharePlaylist() {
    dispatch(selectPlaylist({ isChecked: false, plist: selected as PlaylistResponseDto }));
  }

  async function editPlaylist() {
    edit({ playlistId });
  }

  async function deletePlaylist() {
    await dispatch(removeUserPlaylist(playlistId));
    await dispatch(getUserPlaylists());
    await goToPlaylists();
  }
};

export default withLoadingSpinner(undefined)(withGlobalStateConsumer(PlaylistDetail));
