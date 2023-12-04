import { getTestMediaItemId, initializeTestMediaItem } from './media-item';
import { initializeTestPlaylist } from './playlist';
import { getTestUserId, initializeTestUser } from './user';

// Initialize a user with a single playlist containing a single media item
export const initializePopulatedTestUser = async (
  baseUrl: string,
  userApiBaseUrl: string
) => {
  const [testUser, authResponse] = await initializeTestUser(
    baseUrl,
    userApiBaseUrl
  );
  const testUserId = getTestUserId(testUser);

  const testMediaItem = await initializeTestMediaItem(
    baseUrl,
    authResponse?.['IdToken']
  )(testUserId);
  const testMediaItemId = getTestMediaItemId(testMediaItem);

  const testPlaylist = await initializeTestPlaylist(
    baseUrl,
    authResponse?.['IdToken']
  )(testUserId, testMediaItemId);

  return {
    user: testUserId,
    mediaItem: testMediaItem,
    playlist: testPlaylist,
    authCtx: authResponse,
  };
};
