import { PlaylistActionKeysType, PlaylistActions } from '.';
import { PlaylistResponseDto } from '../../../redux/src';
import { makeActions } from '../../core/actions';

const { getItems } = makeActions<PlaylistActionKeysType>(PlaylistActions);

const getPlaylists = (payload: PlaylistResponseDto) => getItems(payload);

export { getPlaylists };
