import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CombinedState } from 'redux';
import { LoginResponseDto, PlaylistResponseDto } from '../rxjs-api';
import { RootState, useAppSelector } from '../state';
import { findUserPlaylists } from '../state/modules/playlists';
interface LoadDataResult {
  loaded: boolean;
  state: CombinedState<RootState>;
}
export function useLoadData({ action, endLoad }: { action: any; endLoad: () => void }) {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const state = useAppSelector((state) => state);
  useEffect(() => {
    const loadData = async function () {
      await dispatch(action({}));

      endLoad();
    };
    if (!loaded) {
      loadData();
      setLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  return [{ loaded, state }, setLoaded];
}

export const useLoadPlaylistData = function ({ endLoad }: { endLoad: () => void }) {
  const action = () => findUserPlaylists({});
  return useLoadData({ endLoad, action });
} as any;
