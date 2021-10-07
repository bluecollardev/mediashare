import { mediaItems } from '../../apis';

function getAllMedia() {
  return mediaItems.mediaItemControllerFindAll().toPromise();
}

export { getAllMedia };
