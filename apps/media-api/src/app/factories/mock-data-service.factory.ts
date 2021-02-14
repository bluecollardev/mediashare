import { ObjectID } from 'mongodb';

class MockDataService<T> {
  modelFactory: (dto: Partial<T>) => T;

  mockDocuments = new Map<string, T>();

  updatedDocument: T;

  public create(dto: Partial<T>): T {
    return this.modelFactory(dto);
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

export function mockDataServiceFactory() {
  return new MockDataService();
}
