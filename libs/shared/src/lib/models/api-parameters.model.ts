import { ObjectId } from 'mongodb';

class ObjectIdParameters {
  userId: ObjectId;
  playlistId: ObjectId;
  mediaId: ObjectId;
  playlistItemId: ObjectId;
}

export type OptionalObjectIdParameters = Partial<ObjectIdParameters>;

export { ObjectIdParameters };
