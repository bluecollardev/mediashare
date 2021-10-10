import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../state';
import { findUserPlaylists } from '../state/modules/playlists';

export function useLoadData({ action }: { action: any }) {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const state = useAppSelector((state) => state);
  useEffect(() => {
    const loadData = async function () {
      await dispatch(action({}));
    };
    if (!loaded) {
      loadData();
      setLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  return [{ loaded, state }, setLoaded];
}

export const useLoadPlaylistData = function () {
  const action = () => findUserPlaylists({});
  return useLoadData({ action });
} as any;
