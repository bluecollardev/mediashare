import {
  InsertOneWriteOpResult,
  OptionalId,
  UpdateWriteOpResult,
} from 'mongodb';

export type MsDocumentType<T> = OptionalId<T>;

export interface MsDataProvider<T> {
  get: (id: string) => Promise<T>;
  update: (args: Partial<T>) => Promise<UpdateWriteOpResult>;
  create: (args: Partial<T>) => Promise<InsertOneWriteOpResult<T & { _id }>>;
}
