import { OptionalId } from 'mongodb';
import { PinoLogger } from 'nestjs-pino';
import { MongoRepository } from 'typeorm';
import { MSBaseEntity } from '../entities/base.entity';

export type MsDocumentType<T> = OptionalId<T>;
/**
 * Base class to extend for interacting with the database through a repository pattern.
 *
 * Add new standard database interaction methods here. Abstract away complex & nonstandard ones
 * @export
 * @class DataService
 * @template T
 * @template K
 */
export abstract class DataService<
  T extends MSBaseEntity<T>,
  K extends MongoRepository<T>
> {
  constructor(
    protected repository: K,
    private model: T,
    private readonly logger: PinoLogger
  ) {
    logger.setContext(this.constructor.name);
  }

  /**
   * Create a repository item
   *
   * @param {T} dto
   * @return {*}
   * @memberof DataService
   */
  async create(dto: Partial<T>) {
    this.logger.info('create props', dto);

    try {
      const created = await this.repository.save(this.model.factory(dto));
      this.logger.info('create result', created);

      return created;
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
  async findOne(id: string) {
    this.logger.info('findOne props', id);

    try {
      const found = await this.repository.findOne(id);
      this.logger.info('findOne result', found);
      return found;
    } catch (error) {
      this.logger.error(`${this.constructor.name}.findOne ${error}`);
    }
  }

  /**
   * update a document by Id with deep  partial
   *
   * @param {string} id
   * @param {Partial<T>} dto
   * @return {*}
   * @memberof DataService
   */
  async update(id: string, dto: Partial<T>) {
    this.logger.info('update props', id, dto);
    try {
      const update = await this.repository.updateOne({ id }, dto);
      this.logger.info('update result', update);
      return update;
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
      const removed = await this.repository.softDelete(id);
      return removed;
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
  async findAll() {
    this.logger.info('findAll');

    try {
      const findAll = await this.repository.find();
      this.logger.info('findAll result', findAll);
      return findAll;
    } catch (error) {
      this.logger.error(`${this.constructor.name}.findAll ${error}`);
    }
  }
}
