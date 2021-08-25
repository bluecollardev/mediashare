import { CreatePlaylistDto } from '../../../rxjs-api';
import { playlists } from '../../apis';

export function createPlaylist(createPlaylistDto: CreatePlaylistDto) {
  return playlists.playlistControllerCreate({ createPlaylistDto }).toPromise();
}
