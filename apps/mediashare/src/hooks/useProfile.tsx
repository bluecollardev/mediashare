import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { forkJoin, from } from 'rxjs';
import { findMediaItems } from '../state/modules/media-items';
import { loadProfile } from '../state/modules/profile';
import { removeShareItem, readShareItem } from '../state/modules/share-items';
import { loadUser } from '../state/modules/user';
import { loadUsers } from '../state/modules/users';
import { useViewPlaylist } from './NavigationHooks';

export const useProfile = function (userId?: string) {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const playlist = useViewPlaylist();

  const onDelete = function (itemId: string) {
    from(dispatch(removeShareItem(itemId))).subscribe(() => {
      setLoaded(false);
    });
  };

  const onView = function (playlistId: string, shareItemId: string) {
    dispatch(readShareItem(shareItemId));
    setLoaded(false);
    playlist({ playlistId });
  };

  useEffect(() => {
    if (!loaded) {
      forkJoin([dispatch(findMediaItems()), dispatch(loadUsers()), dispatch(loadUser()), dispatch(loadProfile({ userId }))]).subscribe(() => setLoaded(true));
    }
  }, [loaded, dispatch, userId]);

  return { onView, onDelete, setLoaded };
};
