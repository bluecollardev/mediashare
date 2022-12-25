import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { DeepPartial, FindManyOptions, FindOneOptions, MongoRepository } from 'typeorm';
import { SearchParameters } from '@mediashare/shared';
import { BcBaseEntity } from '../entities/base.entity';
import { ObjectIdGuard } from '@util-lib';
import { IdType } from '@core-lib';
import { clone } from 'remeda';

/**
 * Base class to extend for interacting with the database through a repository pattern.
 * Add new standard database interaction methods here. Abstract away complex & nonstandard ones
 * @export
 * @class DataService
 * @template E - Model extends MsBaseEntity
 * @template R - repository extends MongoRepository<Model>
 */
@Injectable()
export abstract class DataService<E extends BcBaseEntity<E>, R extends MongoRepository<E>> {
  protected constructor(protected repository: R, protected readonly logger: PinoLogger) {}

  /**
   * Create a repository item
   *
   * @param {E} dto
   * @return {*}
   * @memberof DataService
   */
  async create(dto: DeepPartial<E>): Promise<E> {
    this.logger.info(`${this.constructor.name}.create props`, dto);

    try {
      const created = await this.repository.save({ ...dto });

      this.logger.info(`${this.constructor.name}.create result`, created);

      return clone(created);
    } catch (error) {
      this.logger.error(`${this.constructor.name}.create ${error}`);
    }
  }

  /**
   * Find a document by Id
   *
   * @param {string} id
   * @param opts
   * @return {*}
   * @memberof DataService
   */
  async findOne(id: IdType, opts: FindOneOptions | undefined = undefined): Promise<E> {
    this.logger.info(`${this.constructor.name}findOne props`, id);
    try {
      const document = await this.repository.findOneBy({ _id: ObjectIdGuard(id) });
      this.logger.info(`${this.constructor.name} findOne result`, document);
      return clone(document);
    } catch (error) {
      this.logger.error(`${this.constructor.name}.findOne ${error}`);
    }
  }

  /**
   * update a document by Id with deep  partial
   *
   * @param {string} id
   * @param {Partial<E>} dto
   * @return {*}
   * @memberof DataService
   */
  async update(id: IdType, dto: Partial<E>): Promise<Partial<E>> {
    this.logger.info('update props', id, dto);
    const { _id, ...rest } = dto;
    try {
      const update = await this.repository.findOneAndUpdate({ _id: ObjectIdGuard(id) }, { $set: { ...rest } });

      this.logger.info('update result', update);

      return clone(dto);
    } catch (error) {
      this.logger.error(`${this.constructor.name}.'/api/playlists/{playlistId}'.replace('{playlistId}', encodeURI(playlistId)) ${error}`);
    }
  }

  /**
   * Remove document by Id
   *
   * @param {string} id
   * @return {*}
   * @memberof DataService
   */
  async remove(id: IdType) {
    try {
      this.logger.info('remove props', id);
      const removed = await this.repository.delete(ObjectIdGuard(id).toHexString());
      return clone(removed);
    } catch (error) {
      this.logger.error(`${this.constructor.name}.remove ${error}`);
    }
  }

  /**
   * Findall documents in collection
   *
   * @return {*}
   * @memberof DataService
   */
  async findAll(): Promise<E[]> {
    this.logger.info(`${this.constructor.name}.findAll`);

    try {
      const findAll = await this.repository.find();
      this.logger.info('findAll result', findAll);
      return clone(findAll);
    } catch (error) {
      this.logger.error(`${this.constructor.name}.findAll ${error}`);
      throw new HttpException('InternalServerErrorException', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Find document by any partial query of the entity.
   *
   * @param {Partial<E>} query
   * @return {*}
   * @memberof DataService
   */
  async findByQuery(query: FindManyOptions<E>): Promise<E> {
    this.logger.info(`${this.constructor.name}.findByQuery`);

    try {
      const findByQuery = await this.repository.findOne(query);
      return clone(findByQuery);
    } catch (error) {
      this.logger.error(`${this.constructor.name}.findOne ${error}`);
    }
  }

  /**
   * Find many document by any partial query of the entity.
   *
   * @param {Partial<E>} query
   * @return {*}
   * @memberof DataService
   */
  async findAllByQuery(query: FindManyOptions<E>): Promise<E[]> {
    this.logger.info(`${this.constructor.name}.findByQuery`);

    try {
      const findByQuery = await this.repository.find(query);

      return clone(findByQuery);
    } catch (error) {
      this.logger.error(`${this.constructor.name}.findAllByQuery ${error}`);
    }
  }

  async insertMany(items: DeepPartial<E>[]) {
    this.logger.info(`${this.constructor.name}.insertMany`);
    try {
      const inserted = await this.repository.save(items);
      this.logger.info(`${this.constructor.name}.insertMany result`, inserted);

      return clone(inserted);
    } catch (error) {
      this.logger.error(`${this.constructor.name}.insertMany failed with: ${error}`);
    }
  }

  /**
   * Override this method when implementing aggregates.
   * @protected
   */
  protected buildAggregateQuery({}: SearchParameters): any[] {
    let aggregateQuery = [];

    aggregateQuery = aggregateQuery.concat([...this.buildFields()]);

    return aggregateQuery;
  }

  /**
   * Override this method when implementing aggregates.
   * @protected
   */
  protected buildFields() {
    return [];
  }
}
