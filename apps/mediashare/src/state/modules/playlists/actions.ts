import { PlaylistActionKeysType, PlaylistActions } from '.';
import { PlaylistResponseDto } from '../../../redux/src';
import { makeActions } from '../../core/types';

const { GET_ITEMS } = makeActions<PlaylistActionKeysType>(PlaylistActions);

const getPlaylists = (payload: PlaylistResponseDto) => GET_ITEMS(payload);

export { getPlaylists };
