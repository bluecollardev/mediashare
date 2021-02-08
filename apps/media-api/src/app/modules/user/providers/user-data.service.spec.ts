import { Test, TestingModule } from '@nestjs/testing';
import { UserData } from './user-data.service';

describe('UserData', () => {
  let provider: UserData;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserData],
    }).compile();

    provider = module.get<UserData>(UserData);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
