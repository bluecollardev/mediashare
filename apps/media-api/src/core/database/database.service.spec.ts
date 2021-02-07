import { Test, TestingModule } from '@nestjs/testing';
import { InsertOneWriteOpResult, WithId } from 'mongodb';
import { DatabaseService } from './database.service';

describe('DatabaseService', () => {
  let service: DatabaseService;
  let testObj: InsertOneWriteOpResult<WithId<{ foo: string }>>;

  const collection = 'likes';

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DatabaseService,
        {
          provide: 'URI',
          useValue:
            'mongodb://localhost:27017/?readPreference=primary&ssl=false',
        },
        {
          provide: 'DB_NAME',
          useValue: 'test',
        },
      ],
    }).compile();

    service = module.get<DatabaseService>(DatabaseService);
    await service.start();

    await service.db(service.dbName).dropCollection('likes');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterAll(async () => {
    if (service.isConnected) await service.close(() => {});
  });

  describe('start', () => {
    it('should connect to mongoDb', async () => {
      await service.start();

      expect(service.isConnected()).toBeTruthy();
    });
  });
  describe('insertRecord', () => {
    it('should insert a new record to the collection', async () => {
      const record = { foo: 'abcdef' };

      const result = await service.insertRecord({
        collection,
        record,
      });

      testObj = result;

      expect(result).toBeDefined();
      expect(result.ops[0].foo).toContain('abcdef');
    });
  });
  describe('updateRecord', () => {
    it('should update an existing record in the collection', async () => {
      const record = { foo: 'abcdef' };

      const inserted = await service.insertRecord({
        collection,
        record,
      });

      const id = inserted.insertedId.toHexString();

      const result = await service.updateRecord<{ foo: string }>({
        collection,
        query: { foo: '' },
        id,
      });

      expect(result).toBeDefined();
      expect(result.upsertedId).toEqual(id);

      expect(result.result.nModified.valueOf()).toEqual(1);
    });
  });

  describe('getRecords', () => {
    it('should get a list of records', async () => {
      const result = await service.getRecords(collection);
      expect(result).toHaveLength(1);
    });
  });

  describe('getRecord', () => {
    it('should get a single record', async () => {
      const result = await service.getRecord({
        id: testObj.insertedId.toHexString(),
        collection,
      });

      expect(result).toBeDefined();
      expect(typeof result.foo).toBe('string');
    });
  });
});
