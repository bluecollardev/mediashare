import { ApiBaseEntity } from '@mediashare/core/entities/base.entity';

class MockDataService<T extends ApiBaseEntity> {
  mockDocuments = new Map<string, T>();

  updatedDocument: T;
  factory: (props: Partial<T>) => DeepPartial<T>;
  entity: T;
  constructor() {}
  public create(dto: Partial<T>): Partial<T> {
    return dto;
  }

  public async remove(id: string): Promise<void> {
    this.mockDocuments.delete(id);
  }
  public async findOne(id: string): Promise<T> {
    return this.mockDocuments.get(id);
  }
  public async findAll(): Promise<T[]> {
    return Array.from(this.mockDocuments.values());
  }

  public async update(id: string, doc: Partial<T>): Promise<T> {
    return this.updatedDocument;
  }
}

export function mockDataServiceFactory<T extends ApiBaseEntity>() {
  return new MockDataService();
}
