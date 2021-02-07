import { Inject, Injectable } from '@nestjs/common';

import * as mongo from 'mongodb';

export const DATABASE_COLLECTIONS = ['likes', 'users', 'media'] as const;
export type DatabaseCollectionType = Partial<
  typeof DATABASE_COLLECTIONS[number]
>;

export type DocumentType<T> = mongo.OptionalId<T>;
@Injectable()
export class DatabaseService extends mongo.MongoClient {
  private prefix: string;
  constructor(
    @Inject('URI') private uri: string,
    @Inject('DB_NAME') private database: string
  ) {
    super(uri, {});

    this.prefix = 'database';
  }

  async insertRecord<T>(opts: {
    collection: DatabaseCollectionType;
    record: DocumentType<T>;
  }): Promise<T> {
    const { collection, record } = opts;
    try {
      let res = await this.db(this.database)
        .collection<T>(collection)
        .insertOne(record);
      if (res.insertedId) {
        const data = res.ops[0] as any;
        return data as T;
      } else {
        throw new Error(this.prefix + 'failed to insert record');
      }
    } catch (err) {
      throw new Error(this.prefix + err.message);
    }
  }

  async updateRecord<T>(opts: {
    collection: DatabaseCollectionType;
    query: { [key: string]: string | Date | boolean };
    id: string;
  }): Promise<mongo.UpdateWriteOpResult> {
    const { collection, query, id } = opts;
    const _id = new mongo.ObjectId(id);
    try {
      let res = await this.db(this.database)
        .collection<T>(collection)
        // @ts-ignore
        .updateOne({ _id }, { $set: { ...query } });
      return res;
    } catch (err) {
      throw err;
    }
  }

  async getRecords(
    collection: DatabaseCollectionType,
    opts: { count: number; batch: number; query: {} } = {
      count: 25,
      batch: 1,
      query: {},
    }
  ) {
    const { count, batch, query } = opts;
    try {
      let res = await this.db(this.database).collection(collection).find({});
      return await res.toArray();
    } catch (err) {
      throw new Error(
        this.prefix + 'database fetch failed with ' + err.message
      );
    }
  }

  async getRecord(opts: { collection: DatabaseCollectionType; id: string }) {
    const { collection, id } = opts;
    if (!id) throw new Error(this.prefix + 'no id entered');
    const _id = new mongo.ObjectId(id);
    try {
      let res = await this.db(this.database)
        .collection(collection)
        .findOne({ _id });
      console.log(res);
      return res;
    } catch (err) {}
  }

  async getRecordByQuery<T>(opts: {
    collection: DatabaseCollectionType;
    query: { [key: string]: string };
  }) {
    const { collection, query } = opts;
    let res = await this.db(this.database)
      .collection(collection)
      .findOne({ ...query });
    return res;
  }
}
