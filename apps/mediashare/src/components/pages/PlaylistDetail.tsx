import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ScrollView } from 'react-native';
import { withGlobalStateConsumer } from 'mediashare/core/globalState';
import { routeNames } from 'mediashare/routes';
import { useAppSelector } from 'mediashare/store';
import { getPlaylistById, removeUserPlaylist, selectMappedPlaylistMediaItems } from 'mediashare/store/modules/playlist';
import { addPlaylistItem } from 'mediashare/store/modules/playlistItem';
import { getUserPlaylists, selectPlaylist } from 'mediashare/store/modules/playlists';
import { loadUsers } from 'mediashare/store/modules/users';
import { mapAvailableTags } from 'mediashare/store/modules/tags';
import {
  useRouteName,
  useRouteWithParams,
  useViewPlaylistItemById,
  useEditPlaylistItemById,
  usePlaylists,
  useViewMediaItemById,
} from 'mediashare/hooks/navigation';
import { withLoadingSpinner } from 'mediashare/components/hoc/withLoadingSpinner';
import { FAB } from 'react-native-paper';
import { PageContainer, PageContent, PageProps, ActionButtons, AppDialog, MediaCard, MediaList } from 'mediashare/components/layout';
import { AuthorProfileDto, PlaylistResponseDto } from 'mediashare/rxjs-api';
import { theme } from 'mediashare/styles';

// @ts-ignore
export const PlaylistDetail = ({ route, globalState = { tags: [] } }: PageProps) => {
  const dispatch = useDispatch();

  const { playlistId = '' } = route?.params || {};

  const edit = useRouteWithParams(routeNames.playlistEdit);
  const addToPlaylist = useRouteWithParams(routeNames.addItemsToPlaylist);
  const viewMediaItemById = useViewMediaItemById();
  const viewPlaylistItemById = useViewPlaylistItemById();
  const editPlaylistItemById = useEditPlaylistItemById();
  const goToShareWith = useRouteName(routeNames.shareWith);
  const goToPlaylists = usePlaylists();
  const playFromBeginning = useViewPlaylistItemById();

  const { loaded, selected } = useAppSelector((state) => state?.playlist);
  const [isLoaded, setIsLoaded] = useState(loaded);

  const appUserId = useAppSelector((state) => state?.user?.entity?._id);
  // @ts-ignore
  const {
    _id,
    title = '',
    authorProfile = {} as AuthorProfileDto,
    createdBy,
    description = '',
    imageSrc,
    category,
    shareCount = 0,
    viewCount = 0,
    likesCount = 0,
    // mediaItems = [],
  } = selected || {};

  const allowEdit = createdBy === appUserId;

  const { tags = [], build } = globalState;
  const tagKeys = (selected?.tags || []).map(({ key }) => key);
  const mappedTags = useMemo(() => mapAvailableTags(tags).filter((tag) => tag.isPlaylistTag), []);
  const items = selectMappedPlaylistMediaItems(selected) || [];

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
            authorProfile={authorProfile}
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
                onPress={() => (items && items.length > 0 ? viewPlaylistMediaItem({ mediaId: items[0]._id, uri: items[0].uri }) : undefined)}
              >
                Play From Beginning
              </Button>
              <Divider /> */}
            {!allowEdit && items.length > 0 && (
              <ActionButtons
                containerStyles={{ marginHorizontal: 0, marginVertical: 15 }}
                showCancel={false}
                showAction={true}
                onActionClicked={async () => {
                  playFromBeginning({ mediaId: items[0]._id, uri: items[0].uri });
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
              list={items}
              showThumbnail={true}
              onViewDetail={activatePlaylistDetail}
              selectable={false}
              actionIconRight={allowEdit ? 'edit' : undefined}
            />
          </MediaCard>
        </ScrollView>
      </PageContent>
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

  function activatePlaylistDetail(item) {
    console.log('activatePlaylistDetail');
    console.log(item);
    return allowEdit
      ? editPlaylistMediaItem({ playlistItemId: item.playlistItemId, mediaId: item.mediaItemId, uri: item.uri, playlistId })
      : viewPlaylistMediaItem({ mediaId: item._id, uri: item.uri });
  }

  async function viewPlaylistMediaItem({ playlistItemId = undefined, mediaId = undefined, uri = undefined }) {
    console.log('viewPlaylistMediaItem');
    if (playlistItemId) {
      viewPlaylistItemById({ playlistItemId, uri });
    } else if (mediaId) {
      viewMediaItemById({ mediaId, uri });
    }
  }

  async function editPlaylistMediaItem({ playlistId = undefined, playlistItemId = undefined, mediaId = undefined, uri = undefined }) {
    console.log('editPlaylistMediaItem');
    let itemId = playlistItemId || mediaId;
    if (!playlistItemId) {
      // Create the playlist item
      console.log('creating playlist item');
      const { payload } = (await dispatch(addPlaylistItem({ playlistId, mediaId, sortIndex: 0 }))) as any;
      console.log('dumping payload');
      itemId = payload._id;
      console.log(payload);
      console.log('reload playlist');
      await dispatch(getPlaylistById(playlistId));
    }
    editPlaylistItemById({ playlistItemId: itemId });
  }
};

export default withLoadingSpinner(undefined)(withGlobalStateConsumer(PlaylistDetail));
