import { IdType } from '@core-lib';

interface IObjectIdParameters {
  userId?: IdType;
  mediaId?: IdType;
  playlistId?: IdType;
  playlistItemId?: IdType;
  createdBy?: IdType;
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
