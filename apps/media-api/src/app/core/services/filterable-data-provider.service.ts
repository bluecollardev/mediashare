import { IdType } from '@core-lib';
import { Injectable } from '@nestjs/common';
import { ObjectIdGuard } from '@util-lib';
import { PinoLogger } from 'nestjs-pino';
import { pipeline } from 'stream';
import { MongoRepository } from 'typeorm';
import { DataService } from '@api-core/services/data-provider.service';
import { SearchParameters } from '@mediashare/shared';
import { BcBaseEntity } from '../entities/base.entity';

/**
 * Base class to extend for interacting with the database through a repository pattern.
 * Add new standard database interaction methods here. Abstract away complex & nonstandard ones
 * @export
 * @class SearchableDataService
 * @template E - Model extends MsBaseEntity
 * @template R - repository extends MongoRepository<Model>
 */
@Injectable()
export abstract class FilterableDataService<E extends BcBaseEntity<E>, R extends MongoRepository<E>> extends DataService<E, R> {
  protected constructor(protected repository: R, protected readonly logger: PinoLogger) {
    super(repository, logger);
  }

  // TODO: Support weights and upgrade MongoDB, for now we're just going to remove description as we can't weight the results...
  // private _collectionIndexName = 'title_text_description_text';
  protected _collectionIndexName = 'title_text';

  protected get collectionIndexName() {
    return this._collectionIndexName;
  }

  protected set collectionIndexName(name) {
    this._collectionIndexName = name;
  }

  // We can't use the TypeORM driver for this, as it doesn't support weights, use the official Node.js driver instead
  // TODO: Support weights and upgrade MongoDB, for now we're just going to remove description as we can't weight the results...
  /* private createCollectionIndex() {
    const db = this.repository.manager.queryRunner.databaseConnection.db('mediashare')
    const collection = db.collection('playlists');
    const await collection.createIndex();
  } */

  // TODO: Finish this later... options could be Elastic, Mongo Atlas Search or Apache Lucene
  protected get useDistributedSearch() {
    return false; // this.configService.get<string>('dbIsMongoAtlas');
  }

  getById(id) {
    const pipeline = [{ $match: { _id: ObjectIdGuard(id) } }, ...this.buildFields(), this.replaceRoot()];
    return this.repository.aggregate(pipeline).next();
  }

  getByUserId(userId: IdType) {
    const pipeline = [{ $match: { createdBy: ObjectIdGuard(userId) } }, ...this.buildFields(), this.replaceRoot()];
    return this.repository.aggregate(pipeline).toArray();
  }

  getPopular() {
    const pipeline = [...this.buildAggregateQuery({}), ...this.buildFields(), { $sort: { likesCount: -1 } }, this.replaceRoot()];
    return this.repository.aggregate(pipeline).toArray();
  }

  search({ userId, query, tags }: SearchParameters) {
    const pipeline = [...this.buildAggregateQuery({ userId, query, tags }), ...this.buildFields(), this.replaceRoot()];
    return this.repository.aggregate(pipeline).toArray();
  }

  protected abstract buildAggregateQuery(params: SearchParameters): any[];

  protected abstract buildFields(): any[];

  protected abstract replaceRoot(): object;
}
