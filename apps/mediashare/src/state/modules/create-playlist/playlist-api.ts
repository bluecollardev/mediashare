import { CreatePlaylistDto } from '../../../rxjs-api';
import { playlists } from '../../apis';

export function savePlaylist(createPlaylistDto: CreatePlaylistDto) {
  return playlists.playlistControllerCreate({ createPlaylistDto }).toPromise();
}
