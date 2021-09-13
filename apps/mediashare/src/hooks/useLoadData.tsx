import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CombinedState } from 'redux';

import { RootState, useAppSelector } from '../state';
import { findUserPlaylists } from '../state/modules/playlists';
import { getPlaylistById } from '../state/modules/playlists/index';
import { useSpinner } from './useSpinner';
interface LoadDataResult {
  loaded: boolean;
  state: CombinedState<RootState>;
}
export function useLoadData({ action }: { action: any }) {
  const [{ startLoad, endLoad, AppSpinner }] = useSpinner();
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const state = useAppSelector((state) => state);
  useEffect(() => {
    const loadData = async function () {
      startLoad();

      await dispatch(action({}));

      setTimeout(() => endLoad(), 1000);
    };
    if (!loaded) {
      loadData();
      setLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  return [{ loaded, state, AppSpinner }, setLoaded];
}

export const useLoadPlaylistData = function () {
  const action = () => findUserPlaylists({});
  return useLoadData({ action });
} as any;

export const useLoadPlaylistByIdData = function ({ endLoad, playlistId, startLoad }: { endLoad: () => void; playlistId: string; startLoad: any }) {
  const [loaded, setLoaded] = useState(false);

  const state = useAppSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    async function loadData() {
      startLoad();
      await dispatch(getPlaylistById(playlistId));
      endLoad();
    }
    if (!loaded || playlistId !== state.playlist.selectedPlaylist._id) {
      loadData().then(() => endLoad());
      setLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, playlistId]);
  return [{ loaded, state }, setLoaded];
};
