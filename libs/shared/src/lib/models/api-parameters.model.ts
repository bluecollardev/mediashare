import { ObjectId } from 'mongodb';

interface IObjectIdParameters {
  userId?: ObjectId;
  mediaId?: ObjectId;
  playlistId?: ObjectId;
  playlistItemId?: ObjectId;
  createdBy?: ObjectId;
}

export type ObjectIdParameters = Partial<IObjectIdParameters>;

interface IContentSearchParameters {
  query?: string;
  fullText?: boolean; // Search all text fields?
  textMatchingMode?: 'and' | 'or';
  tags?: string[];
  tagsMatchingMode?: 'any' | 'all';
}

export type ContentSearchParameters = Partial<IContentSearchParameters>;

export type SearchParameters = Partial<ObjectIdParameters & ContentSearchParameters>;
