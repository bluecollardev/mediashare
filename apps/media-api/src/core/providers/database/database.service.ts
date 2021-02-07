import { Inject, Injectable } from '@nestjs/common';

import * as mongo from 'mongodb';

export const DATABASE_COLLECTIONS = ['likes', 'users', 'media'] as const;
export type DatabaseCollectionType = Partial<
  typeof DATABASE_COLLECTIONS[number]
>;

export type DocumentType<T> = mongo.OptionalId<T>;

@Injectable()
export class DatabaseService extends mongo.MongoClient {
  get dbName() {
    return this.database;
  }
  private prefix: string;

  private client: mongo.MongoClient;

  constructor(
    @Inject('URI') uri: string,
    @Inject('DB_NAME') private database: string
  ) {
    super(uri, {});

    this.prefix = 'database';
  }

  async start() {
    const client = await this.connect();

    this.client = client;
  }

  insertRecord<T>(opts: {
    collection: DatabaseCollectionType;
    record: DocumentType<T>;
  }) {
    const { collection, record } = opts;
    return this.db(this.database).collection<T>(collection).insertOne(record);
  }

  updateRecord<T>(opts: {
    collection: DatabaseCollectionType;
    query: { [key: string]: string | Date | boolean };
    id: string;
  }): Promise<mongo.UpdateWriteOpResult> {
    const { collection, query, id: _id } = opts;

    return (
      this.db(this.database)
        .collection<T>(collection)
        // @ts-ignore
        .updateOne({ _id }, { $set: { ...query } })
    );
  }

  getRecords(
    collection: DatabaseCollectionType,
    opts: { count: number; batch: number; query: {} } = {
      count: 25,
      batch: 1,
      query: {},
    }
  ) {
    const { count, batch, query } = opts;
    return this.db(this.database).collection(collection).find({}).toArray();
  }

  getRecord(opts: { collection: DatabaseCollectionType; id: string }) {
    const { collection, id } = opts;
    if (!id) throw new Error(this.prefix + 'no id entered');
    const _id = new mongo.ObjectId(id);
    return this.db(this.database).collection(collection).findOne({ _id });
  }

  getRecordByQuery<T>(opts: {
    collection: DatabaseCollectionType;
    query: { [key: string]: string };
  }) {
    const { collection, query } = opts;
    return this.db(this.database)
      .collection(collection)
      .findOne({ ...query });
  }

  deleteRecord(opts: { collection: DatabaseCollectionType; id: string }) {}
}
