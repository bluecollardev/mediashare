// TODO: This is incomplete! Do we even need a generic data loader? If we don't need it remove it...
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from 'mediashare/store';
import { getUserPlaylists } from 'mediashare/store/modules/playlists';

export function useLoadData({ action }: { action: any }) {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const state = useAppSelector((state) => state);
  useEffect(() => {
    const loadData = async function () {
      await dispatch(action({}));
    };
    if (!loaded) {
      loadData().then(() => {
        setLoaded(true);
      });
    }
  }, [loaded]);

  return [{ loaded, state }, setLoaded];
}

export const useLoadPlaylistData = function () {
  const action = () => getUserPlaylists();
  return useLoadData({ action });
} as any;
