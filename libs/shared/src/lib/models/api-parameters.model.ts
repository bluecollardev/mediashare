import { ObjectId } from 'mongodb';

class ObjectIdParameters {
  userId: ObjectId;
  playlistId: ObjectId;
  mediaId: ObjectId;
  playlistItemId: ObjectId;
  createdBy: ObjectId;
}

export type OptionalObjectIdParameters = Partial<ObjectIdParameters>;

export { ObjectIdParameters };
