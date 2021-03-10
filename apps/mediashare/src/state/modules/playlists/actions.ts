import { PlaylistActionKeysType, PlaylistActions } from '.';
import { PlaylistResponseDto } from '../../../api';
import { makeActions } from '../../core/actions';

const { getItems } = makeActions<PlaylistActionKeysType>(PlaylistActions);

const getPlaylists = (payload: PlaylistResponseDto) => getItems(payload);

export { getPlaylists };
