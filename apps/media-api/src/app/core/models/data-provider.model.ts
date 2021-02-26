import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ObjectId, OptionalId } from 'mongodb';
import { PinoLogger } from 'nestjs-pino';
import { DeepPartial, MongoRepository } from 'typeorm';
import { BcBaseEntity } from '../entities/base.entity';

import * as R from 'remeda';

export type MsDocumentType<T> = OptionalId<T>;
/**
 * Base class to extend for interacting with the database through a repository pattern.
 *
 * Add new standard database interaction methods here. Abstract away complex & nonstandard ones
 * @export
 * @class DataService
 * @template E - Model extends MsBaseEntity
 * @template R - repository extends MongoRepository<Model>
 */
@Injectable()
export abstract class DataService<E extends BcBaseEntity<E>, R extends MongoRepository<E>> {
  constructor(protected repository: R, private readonly logger: PinoLogger) {
    logger.setContext(this.constructor.name);
  }

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
      const created = await this.repository.save(dto);

      this.logger.info(`${this.constructor.name}.create result`, created);

      return R.clone(created);
    } catch (error) {
      this.logger.error(`${this.constructor.name}.create ${error}`);
    }
  }

  /**
   * Find a document by Id
   *
   * @param {string} id
   * @return {*}
   * @memberof DataService
   */
  async findOne(id: string): Promise<E> {
    this.logger.info(`${this.constructor.name}findOne props`, id);

    try {
      const document = await this.repository.findOne(id);
      this.logger.info('${this.constructor.name}findOne result', document);
      return R.clone(document);
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
  async update(id: string, dto: Partial<E>): Promise<Partial<E>> {
    this.logger.info('update props', id, dto);
    try {
      const update = await this.repository.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: dto },
        { returnOriginal: false }
      );
      this.logger.info('update result', update);

      return R.clone(update.value);
    } catch (error) {
      this.logger.error(`${this.constructor.name}.update ${error}`);
    }
  }

  /**
   * Remove document by Id
   *
   * @param {string} id
   * @return {*}
   * @memberof DataService
   */
  async remove(id: string) {
    try {
      this.logger.info('remove props', id);
      const removed = await this.repository.delete(id);
      return R.clone(removed);
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
      return R.clone(findAll);
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
  async findByQuery(query: Partial<E>): Promise<E> {
    this.logger.info(`${this.constructor.name}.findByQuery`);

    try {
      const findByQuery = await this.repository.findOne(query);

      return R.clone(findByQuery);
    } catch (error) {
      this.logger.error(`${this.constructor.name}.findOne ${error}`);
    }
  }

  async insertMany(items: DeepPartial<E>[]) {
    this.logger.info(`${this.constructor.name}.insertMany`);

    try {
      const inserted = await this.repository.save(items);
      this.logger.info(`${this.constructor.name}.insertMany result`, inserted);

      return R.clone(inserted);
    } catch (error) {
      this.logger.error(`${this.constructor.name}.insertMany failed with: ${error}`);
    }
  }
}
