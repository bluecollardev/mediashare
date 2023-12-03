import { ObjectId } from 'mongodb';

function mapPlaylistItems(
  ids: Readonly<string[]>,
  params: { userId: string; playlistId: ObjectId }
) {
  const { userId, playlistId } = params;

  return ids.map((id) => ({
    userId,
    mediaId: new ObjectId(id),
    playlistId,
  }));
}

export { mapPlaylistItems };
