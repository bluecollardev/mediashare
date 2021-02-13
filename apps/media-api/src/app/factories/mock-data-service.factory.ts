class MockDataService {
  create() {}
  findOne() {}
  update() {}
  remove() {}
  findAll() {}
}

export function mockDataServiceFactory() {
  return new MockDataService();
}
