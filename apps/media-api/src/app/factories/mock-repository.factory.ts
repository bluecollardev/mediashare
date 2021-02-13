class MockRepository {
  public create(): void {}
  public async save(): Promise<void> {}
  public async remove(): Promise<void> {}
  public async findOne(): Promise<void> {}
  public async findAll(): Promise<void> {}
}

export function mockRepositoryFactory() {
  return new MockRepository();
}
